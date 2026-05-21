"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type ActionResult =
  | { success: true; posterId: string }
  | { success: false; error: string };

type PosterInput = {
  title: string;
  topic: string;
  year: string;
  tools: string[];
  image_label: string;
  display_order: number;
};

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

function validatePosterInput(
  formData: FormData
): { data: PosterInput } | { error: string } {
  const title = (formData.get("title") as string)?.trim();
  const topic = (formData.get("topic") as string)?.trim();
  const yearRaw = (formData.get("year") as string)?.trim();
  const image_label = (formData.get("image_label") as string)?.trim();
  const displayOrderRaw = formData.get("display_order") as string;

  if (!title || !topic || !image_label) {
    return { error: "Field title, topic, dan image label wajib diisi." };
  }

  const year = parseInt(yearRaw, 10);
  if (isNaN(year) || year < 1900 || year > 2100) {
    return { error: "Year harus berupa angka 4-digit yang valid." };
  }

  const displayOrder = parseInt(displayOrderRaw, 10);
  if (isNaN(displayOrder) || displayOrder < 0) {
    return { error: "Display order harus berupa angka non-negatif." };
  }

  // Parse tools from FormData (array of "tool_N_label")
  const tools: string[] = [];
  let toolIndex = 0;
  while (true) {
    const toolLabel = formData.get(`tool_${toolIndex}_label`);
    if (toolLabel === null) break;

    const trimmed = (toolLabel as string).trim();
    if (trimmed) {
      tools.push(trimmed);
    }

    toolIndex++;
  }

  if (tools.length === 0) {
    return { error: "Minimal 1 tools tag wajib diisi." };
  }

  return {
    data: {
      title,
      topic,
      year: String(year),
      tools,
      image_label,
      display_order: displayOrder,
    },
  };
}

export async function createPoster(
  formData: FormData
): Promise<ActionResult> {
  const validation = validatePosterInput(formData);

  if ("error" in validation) {
    return { success: false, error: validation.error };
  }

  // Validate file
  const file = formData.get("image_file");

  if (!file || !(file instanceof File) || file.size === 0) {
    return { success: false, error: "File gambar wajib diupload." };
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return {
      success: false,
      error: `File terlalu besar (max ${MAX_FILE_SIZE_MB}MB).`,
    };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.",
    };
  }

  const supabase = await createClient();

  // Step 1: Insert poster row WITHOUT storage_path first
  const { data: poster, error: insertError } = await supabase
    .from("posters")
    .insert(validation.data)
    .select("id")
    .single();

  if (insertError || !poster) {
    console.error("Failed to insert poster:", insertError);
    return {
      success: false,
      error: "Gagal menyimpan poster. Silakan coba lagi.",
    };
  }

  const posterId = poster.id as string;

  // Step 2: Upload file to Storage
  const ext = file.name.split(".").pop() || "jpg";
  const storagePath = `posters/${posterId}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("karya-images")
    .upload(storagePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Failed to upload image:", uploadError);
    // Rollback: delete the poster row
    await supabase.from("posters").delete().eq("id", posterId);
    return { success: false, error: "Gagal upload gambar. Poster dibatalkan." };
  }

  // Step 3: Update poster row with storage_path
  const { error: updateError } = await supabase
    .from("posters")
    .update({ storage_path: storagePath })
    .eq("id", posterId);

  if (updateError) {
    console.error("Failed to update storage_path:", updateError);
    // Rollback: delete uploaded file + poster row
    await supabase.storage.from("karya-images").remove([storagePath]);
    await supabase.from("posters").delete().eq("id", posterId);
    return {
      success: false,
      error: "Gagal menyimpan path gambar. Poster dibatalkan.",
    };
  }

  // Step 4: Revalidate paths
  revalidatePath("/karya/infographic-design");
  revalidatePath("/admin/posters");

  redirect("/admin/posters");
}

export async function updatePoster(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const validation = validatePosterInput(formData);

  if ("error" in validation) {
    return { success: false, error: validation.error };
  }

  const supabase = await createClient();

  // Fetch existing poster (need storage_path for potential replacement)
  const { data: existing, error: fetchError } = await supabase
    .from("posters")
    .select("id, storage_path")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return { success: false, error: "Poster tidak ditemukan." };
  }

  const existingStoragePath = (existing.storage_path as string | null) ?? null;

  // Check if a new file was uploaded
  const file = formData.get("image_file");
  const hasNewFile = file instanceof File && file.size > 0;

  let newStoragePath: string | null = existingStoragePath;

  if (hasNewFile) {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return {
        success: false,
        error: `File terlalu besar (max ${MAX_FILE_SIZE_MB}MB).`,
      };
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        success: false,
        error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.",
      };
    }

    const ext = file.name.split(".").pop() || "jpg";
    const candidateStoragePath = `posters/${id}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();

    // If same extension: upsert to overwrite in place
    // If different extension: upload to new path, delete old after
    const useUpsert = existingStoragePath === candidateStoragePath;

    const { error: uploadError } = await supabase.storage
      .from("karya-images")
      .upload(candidateStoragePath, arrayBuffer, {
        contentType: file.type,
        upsert: useUpsert,
      });

    if (uploadError) {
      console.error("Failed to upload new image:", uploadError);
      return {
        success: false,
        error: "Gagal upload gambar baru. Perubahan dibatalkan.",
      };
    }

    newStoragePath = candidateStoragePath;

    // Delete old file only if path differs (different extension)
    if (existingStoragePath && existingStoragePath !== candidateStoragePath) {
      const { error: deleteError } = await supabase.storage
        .from("karya-images")
        .remove([existingStoragePath]);

      if (deleteError) {
        // Non-fatal: log but continue. Orphaned file can be cleaned up manually.
        console.error("Failed to delete old image (orphan):", deleteError);
      }
    }
  }

  // Update poster row with new data + (possibly new) storage_path
  const updatePayload = {
    ...validation.data,
    storage_path: newStoragePath,
  };

  const { error: updateError } = await supabase
    .from("posters")
    .update(updatePayload)
    .eq("id", id);

  if (updateError) {
    console.error("Failed to update poster:", updateError);

    // If we uploaded a new file but DB update failed, try to cleanup the new file
    if (
      hasNewFile &&
      newStoragePath &&
      newStoragePath !== existingStoragePath
    ) {
      await supabase.storage.from("karya-images").remove([newStoragePath]);
    }

    return {
      success: false,
      error: "Gagal menyimpan perubahan. Silakan coba lagi.",
    };
  }

  revalidatePath("/karya/infographic-design");
  revalidatePath("/admin/posters");

  redirect("/admin/posters");
}
