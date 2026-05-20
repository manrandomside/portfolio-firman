"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type ActionResult =
  | { success: true; projectId: string }
  | { success: false; error: string };

type ProjectInput = {
  area_id: string;
  number: string;
  title: string;
  role_timeline: string;
  description: string;
  display_order: number;
};

const MAX_FILE_SIZE_MB = 5;
const MAX_IMAGES_PER_PROJECT = 10;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

function validateProjectInput(
  formData: FormData
): { data: ProjectInput } | { error: string } {
  const area_id = (formData.get("area_id") as string)?.trim();
  const number = (formData.get("number") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const role_timeline = (formData.get("role_timeline") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const displayOrderRaw = formData.get("display_order") as string;

  if (!area_id || !number || !title || !role_timeline || !description) {
    return {
      error:
        "Field area, number, title, role/timeline, dan description wajib diisi.",
    };
  }

  const displayOrder = parseInt(displayOrderRaw, 10);
  if (isNaN(displayOrder) || displayOrder < 0) {
    return { error: "Display order harus berupa angka non-negatif." };
  }

  return {
    data: {
      area_id,
      number,
      title,
      role_timeline,
      description,
      display_order: displayOrder,
    },
  };
}

function parseArrayFromFormData<T>(
  formData: FormData,
  prefix: string,
  fields: string[]
): T[] {
  const result: T[] = [];
  let index = 0;

  while (true) {
    const firstField = formData.get(`${prefix}_${index}_${fields[0]}`);
    if (firstField === null) break;

    const item: Record<string, string | number | boolean> = {};
    fields.forEach((field) => {
      const value = formData.get(`${prefix}_${index}_${field}`);
      if (value !== null) {
        item[field] = value as string;
      }
    });

    result.push(item as T);
    index++;
  }

  return result;
}

export async function createProject(
  formData: FormData
): Promise<ActionResult> {
  const validation = validateProjectInput(formData);

  if ("error" in validation) {
    return { success: false, error: validation.error };
  }

  const techLabels = parseArrayFromFormData<{ label: string }>(
    formData,
    "tech",
    ["label"]
  );
  const linkInputs = parseArrayFromFormData<{
    label: string;
    href: string;
    is_external: string;
  }>(formData, "link", ["label", "href", "is_external"]);

  const imageFiles: { file: File; label: string; aspect: string }[] = [];
  let imageIndex = 0;
  while (true) {
    const file = formData.get(`image_${imageIndex}_file`);
    const label = formData.get(`image_${imageIndex}_label`);
    const aspect = formData.get(`image_${imageIndex}_aspect`);

    if (file === null) break;
    if (!(file instanceof File) || file.size === 0) {
      imageIndex++;
      continue;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return {
        success: false,
        error: `File ${file.name} terlalu besar (max ${MAX_FILE_SIZE_MB}MB).`,
      };
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `File ${file.name} tipe tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.`,
      };
    }

    imageFiles.push({
      file,
      label: (label as string) || "",
      aspect: (aspect as string) || "video",
    });

    imageIndex++;
  }

  if (imageFiles.length > MAX_IMAGES_PER_PROJECT) {
    return {
      success: false,
      error: `Maksimal ${MAX_IMAGES_PER_PROJECT} gambar per project.`,
    };
  }

  const supabase = await createClient();

  // Step 1: Insert project row
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert(validation.data)
    .select("id")
    .single();

  if (projectError || !project) {
    console.error("Failed to create project:", projectError);
    return {
      success: false,
      error: "Gagal menyimpan project. Silakan coba lagi.",
    };
  }

  const projectId = project.id as string;

  // Step 2: Insert tech rows
  if (techLabels.length > 0) {
    const techRows = techLabels
      .filter((t) => t.label && t.label.trim().length > 0)
      .map((t, idx) => ({
        project_id: projectId,
        label: t.label.trim(),
        display_order: idx,
      }));

    if (techRows.length > 0) {
      const { error: techError } = await supabase
        .from("project_tech")
        .insert(techRows);
      if (techError) {
        console.error("Failed to insert tech:", techError);
        await supabase.from("projects").delete().eq("id", projectId);
        return {
          success: false,
          error: "Gagal menyimpan tech tags. Project dibatalkan.",
        };
      }
    }
  }

  // Step 3: Insert link rows
  if (linkInputs.length > 0) {
    const linkRows = linkInputs
      .filter(
        (l) =>
          l.label && l.href && l.label.trim().length > 0 && l.href.trim().length > 0
      )
      .map((l, idx) => ({
        project_id: projectId,
        label: l.label.trim(),
        href: l.href.trim(),
        is_external: l.is_external === "true",
        display_order: idx,
      }));

    if (linkRows.length > 0) {
      const { error: linkError } = await supabase
        .from("project_links")
        .insert(linkRows);
      if (linkError) {
        console.error("Failed to insert links:", linkError);
        await supabase.from("projects").delete().eq("id", projectId);
        return {
          success: false,
          error: "Gagal menyimpan links. Project dibatalkan.",
        };
      }
    }
  }

  // Step 4: Upload images to storage and insert project_images rows
  if (imageFiles.length > 0) {
    const imageRows: {
      project_id: string;
      storage_path: string;
      label: string;
      aspect: string;
      display_order: number;
    }[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const { file, label, aspect } = imageFiles[i];

      const ext = file.name.split(".").pop() || "jpg";
      const imageId = crypto.randomUUID();
      const storagePath = `projects/${projectId}/${imageId}.${ext}`;

      const arrayBuffer = await file.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from("karya-images")
        .upload(storagePath, arrayBuffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Failed to upload image:", uploadError);

        for (const row of imageRows) {
          await supabase.storage
            .from("karya-images")
            .remove([row.storage_path]);
        }
        await supabase.from("projects").delete().eq("id", projectId);

        return {
          success: false,
          error: `Gagal upload ${file.name}. Project dibatalkan.`,
        };
      }

      imageRows.push({
        project_id: projectId,
        storage_path: storagePath,
        label: label.trim() || `Image ${i + 1}`,
        aspect,
        display_order: i,
      });
    }

    const { error: imageError } = await supabase
      .from("project_images")
      .insert(imageRows);

    if (imageError) {
      console.error("Failed to insert image records:", imageError);
      for (const row of imageRows) {
        await supabase.storage
          .from("karya-images")
          .remove([row.storage_path]);
      }
      await supabase.from("projects").delete().eq("id", projectId);
      return {
        success: false,
        error: "Gagal menyimpan image records. Project dibatalkan.",
      };
    }
  }

  // Get area slug for revalidation
  const { data: area } = await supabase
    .from("impact_areas")
    .select("slug")
    .eq("id", validation.data.area_id)
    .single();

  if (area) {
    revalidatePath(`/karya/${area.slug}`);
  }
  revalidatePath("/admin/projects");

  redirect("/admin/projects");
}
