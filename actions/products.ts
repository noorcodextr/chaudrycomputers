"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { authOptions } from "@/lib/auth";

const categoryValues = [
  "Processors",
  "Graphics Cards",
  "Memory",
  "Storage",
  "Power Supply",
  "Cooling",
  "Peripherals",
  "Accessories",
] as const;

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255),

  category: z.enum(categoryValues),

  imageUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  imageUrls: z
    .array(z.string().url())
    .default([]),

  specs: z
    .array(z.string().min(1))
    .default([]),

  price: z.coerce
    .number()
    .int()
    .positive("Price must be a positive number"),

  compareAtPrice: z
    .number()
    .int()
    .positive()
    .nullable(),

  badge: z
    .string()
    .max(100)
    .optional()
    .or(z.literal("")),

  available: z
    .boolean()
    .default(true),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }
}

function parseFormData(formData: FormData) {
  /* -------------------------
     Specifications
  ------------------------- */

  const specsRaw =
    formData.get("specs")?.toString() ?? "";

  const specs = specsRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  /* -------------------------
     Images
  ------------------------- */

  const imageUrl =
    formData.get("imageUrl")?.toString().trim() ?? "";

  const imageUrlsRaw =
    formData.get("imageUrls")?.toString() ?? "[]";

  let imageUrls: string[] = [];

  try {
    const parsed = JSON.parse(imageUrlsRaw);

    if (Array.isArray(parsed)) {
      imageUrls = parsed.filter(
        (url): url is string =>
          typeof url === "string" &&
          url.length > 0
      );
    }
  } catch {
    imageUrls = [];
  }

  /*
   * Backwards compatibility:
   *
   * If an old product only has imageUrl,
   * put that image into imageUrls.
   */
  if (imageUrls.length === 0 && imageUrl) {
    imageUrls = [imageUrl];
  }

  /*
   * Always make the first image the main image.
   */
  const mainImageUrl =
    imageUrls[0] ?? imageUrl ?? "";

  /* -------------------------
     Compare At Price
  ------------------------- */

  const compareAtPriceRaw =
    formData
      .get("compareAtPrice")
      ?.toString()
      .trim() ?? "";

  const compareAtPrice =
    compareAtPriceRaw === ""
      ? null
      : Number(compareAtPriceRaw);

  /* -------------------------
     Validate
  ------------------------- */

  return productSchema.parse({
    name:
      formData.get("name")?.toString() ?? "",

    category:
      formData.get("category")?.toString() ?? "",

    imageUrl: mainImageUrl,

    imageUrls,

    specs,

    price:
      formData.get("price")?.toString() ?? "",

    compareAtPrice,

    badge:
      formData.get("badge")?.toString() ?? "",

    available:
      formData.get("available") === "on",
  });
}

/* =========================
   CREATE PRODUCT
========================= */

export async function createProduct(
  formData: FormData
) {
  await requireAdmin();

  const data = parseFormData(formData);

  await db.insert(products).values({
    name: data.name,
    category: data.category,

    imageUrl:
      data.imageUrl || null,

    imageUrls:
      data.imageUrls,

    specs:
      data.specs,

    price:
      data.price,

    compareAtPrice:
      data.compareAtPrice ?? null,

    badge:
      data.badge || null,

    available:
      data.available,
  });

  revalidatePath("/admin/products");
  revalidatePath("/");

  redirect("/admin/products");
}

/* =========================
   UPDATE PRODUCT
========================= */

export async function updateProduct(
  id: number,
  formData: FormData
) {
  await requireAdmin();

  const data = parseFormData(formData);

  await db
    .update(products)
    .set({
      name:
        data.name,

      category:
        data.category,

      imageUrl:
        data.imageUrl || null,

      imageUrls:
        data.imageUrls,

      specs:
        data.specs,

      price:
        data.price,

      compareAtPrice:
        data.compareAtPrice ?? null,

      badge:
        data.badge || null,

      available:
        data.available,

      updatedAt:
        new Date(),
    })
    .where(
      eq(products.id, id)
    );

  revalidatePath("/admin/products");
  revalidatePath(`/product/${id}`);
  revalidatePath("/");

  redirect("/admin/products");
}

/* =========================
   DELETE PRODUCT
========================= */

export async function deleteProduct(
  id: number
) {
  await requireAdmin();

  await db
    .delete(products)
    .where(eq(products.id, id));

  revalidatePath("/admin/products");
  revalidatePath(`/product/${id}`);
  revalidatePath("/");
}

/* =========================
   TOGGLE AVAILABILITY
========================= */

export async function toggleAvailability(
  id: number,
  available: boolean
) {
  await requireAdmin();

  await db
    .update(products)
    .set({
      available,
      updatedAt:
        new Date(),
    })
    .where(
      eq(products.id, id)
    );

  revalidatePath("/admin/products");
  revalidatePath(`/product/${id}`);
  revalidatePath("/");
}