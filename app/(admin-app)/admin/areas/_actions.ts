"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type AreaInput = {
  slug: string;
  number_label: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
};

type ActionResult = { success: true } | { success: false; error: string };

function validateAreaInput(
  formData: FormData
): { data: AreaInput } | { error: string } {
  const slug = (formData.get("slug") as string)?.trim();
  const numberLabel = (formData.get("number_label") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const iconName = (formData.get("icon_name") as string)?.trim();
  const displayOrderRaw = formData.get("display_order") as string;

  // Required fields check
  if (!slug || !numberLabel || !title || !description || !iconName) {
    return { error: "Semua field wajib diisi." };
  }

  // Slug format validation: lowercase, alphanumeric, hyphens only
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return {
      error: "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.",
    };
  }

  // Display order validation
  const displayOrder = parseInt(displayOrderRaw, 10);
  if (isNaN(displayOrder) || displayOrder < 0) {
    return { error: "Display order harus berupa angka non-negatif." };
  }

  return {
    data: {
      slug,
      number_label: numberLabel,
      title,
      description,
      icon_name: iconName,
      display_order: displayOrder,
    },
  };
}

export async function createArea(formData: FormData): Promise<ActionResult> {
  const validation = validateAreaInput(formData);

  if ("error" in validation) {
    return { success: false, error: validation.error };
  }

  const supabase = await createClient();

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from("impact_areas")
    .select("id")
    .eq("slug", validation.data.slug)
    .single();

  if (existing) {
    return {
      success: false,
      error: "Slug sudah digunakan. Pilih slug yang berbeda.",
    };
  }

  const { error } = await supabase
    .from("impact_areas")
    .insert(validation.data);

  if (error) {
    console.error("Failed to create area:", error);
    return { success: false, error: "Gagal menyimpan data. Silakan coba lagi." };
  }

  // Revalidate public homepage and the new detail page
  revalidatePath("/");
  revalidatePath(`/karya/${validation.data.slug}`);
  revalidatePath("/admin/areas");

  redirect("/admin/areas");
}

export async function updateArea(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const validation = validateAreaInput(formData);

  if ("error" in validation) {
    return { success: false, error: validation.error };
  }

  const supabase = await createClient();

  // Get the original slug for revalidation comparison
  const { data: original } = await supabase
    .from("impact_areas")
    .select("slug")
    .eq("id", id)
    .single();

  if (!original) {
    return { success: false, error: "Area tidak ditemukan." };
  }

  // Check slug uniqueness if changed
  if (original.slug !== validation.data.slug) {
    const { data: conflict } = await supabase
      .from("impact_areas")
      .select("id")
      .eq("slug", validation.data.slug)
      .neq("id", id)
      .single();

    if (conflict) {
      return {
        success: false,
        error: "Slug sudah digunakan. Pilih slug yang berbeda.",
      };
    }
  }

  const { error } = await supabase
    .from("impact_areas")
    .update(validation.data)
    .eq("id", id);

  if (error) {
    console.error("Failed to update area:", error);
    return {
      success: false,
      error: "Gagal menyimpan perubahan. Silakan coba lagi.",
    };
  }

  // Revalidate old slug path (in case slug changed) and new slug path
  revalidatePath("/");
  revalidatePath(`/karya/${original.slug}`);
  if (original.slug !== validation.data.slug) {
    revalidatePath(`/karya/${validation.data.slug}`);
  }
  revalidatePath("/admin/areas");

  redirect("/admin/areas");
}
