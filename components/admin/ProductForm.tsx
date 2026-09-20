"use client";

import { categories } from "@/types/categories";
import type { Product } from "@/types/products";
import { useState } from "react";

export default function ProductForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: Product;
  submitLabel: string;
}) {
  const [pending, setPending] = useState(false);


  const [imageUrls, setImageUrls] = useState<string[]>(
    initialValues?.imageUrls?.length
      ? initialValues.imageUrls
      : initialValues?.imageUrl
        ? [initialValues.imageUrl]
        : []
  );

  const [uploading, setUploading] = useState(false);

  const [uploadError, setUploadError] = useState("");

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    setUploadError("");
    setUploading(true);

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Upload failed"
        );
      }

      const uploadedUrls = data.images.map(
        (image: { url: string }) => image.url
      );

      setImageUrls((current) => [
        ...current,
        ...uploadedUrls,
      ]);


    } catch (error) {
      console.error(error);

      setUploadError(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  }

  function removeImage(index: number) {
    setImageUrls((current) =>
      current.filter((_, i) => i !== index)
    );


  }

  return (
    <form
      action={action}
      onSubmit={() => setPending(true)}
      className="max-w-xl space-y-5"
    >
      {/* Product Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Product Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialValues?.name ?? ""}
          className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-chred"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          required
          defaultValue={
            initialValues?.category ??
            categories.filter((c) => c !== "All")[0]
          }
          className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-chred"
        >
          {categories
            .filter((category) => category !== "All")
            .map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
        </select>
      </div>

      {/* Product Images */}
      <div>
        <label
          htmlFor="images"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Product Images
        </label>

        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={uploading}
          className="w-full cursor-pointer border border-border bg-background px-4 py-3 text-sm"
        />

        <p className="mt-2 text-xs text-muted-foreground">
          Select new images only if you want to add or replace product photos.
        </p>

        {/* Upload Status */}
        {uploading && (
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">
            Uploading images to Cloudinary...
          </p>
        )}

        {/* Upload Error */}
        {uploadError && (
          <p className="mt-3 text-xs font-bold text-red-500">
            {uploadError}
          </p>
        )}

        {/* Image Preview */}
        {imageUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imageUrls.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group relative aspect-square overflow-hidden border border-border bg-[hsl(216_26%_13%)]"
              >
                <img
                  src={url}
                  alt={`Product image ${index + 1}`}
                  className="h-full w-full object-contain p-2"
                />

                {/* Main Image */}
                {index === 0 && (
                  <span className="absolute left-2 top-2 bg-chred px-2 py-1 text-[8px] font-extrabold uppercase tracking-wider text-white">
                    Main
                  </span>
                )}

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 grid size-7 place-items-center bg-black/70 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label={`Remove image ${index + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hidden fields */}
        <input
          type="hidden"
          name="imageUrl"
          value={imageUrls[0] ?? ""}
        />

        <input
          type="hidden"
          name="imageUrls"
          value={JSON.stringify(imageUrls)}
        />
      </div>

      {/* Specs */}
      <div>
        <label
          htmlFor="specs"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Specifications
        </label>

        <textarea
          id="specs"
          name="specs"
          rows={5}
          defaultValue={
            initialValues?.specs?.join("\n") ?? ""
          }
          placeholder={`Ryzen 7 7800X3D
8 Cores / 16 Threads
AM5 Socket`}
          className="w-full resize-none border border-border bg-background px-4 py-3 outline-none focus:border-chred"
        />

        <p className="mt-2 text-xs text-muted-foreground">
          Put each specification on a separate line.
        </p>
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          min="0"
          required
          defaultValue={initialValues?.price ?? ""}
          className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-chred"
        />
      </div>

      {/* Compare Price */}
      <div>
        <label
          htmlFor="compareAtPrice"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Compare At Price
        </label>

        <input
          id="compareAtPrice"
          name="compareAtPrice"
          type="number"
          min="0"
          defaultValue={
            initialValues?.compareAtPrice ?? ""
          }
          className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-chred"
        />
      </div>

      {/* Badge */}
      <div>
        <label
          htmlFor="badge"
          className="mb-2 block text-xs font-bold uppercase tracking-wider"
        >
          Badge
        </label>

        <input
          id="badge"
          name="badge"
          type="text"
          defaultValue={initialValues?.badge ?? ""}
          placeholder="Best Seller"
          className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-chred"
        />
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3">
        <input
          id="available"
          name="available"
          type="checkbox"
          defaultChecked={
            initialValues?.available ?? true
          }
          className="size-4 accent-[var(--chred)]"
        />

        <label
          htmlFor="available"
          className="text-xs font-bold uppercase tracking-wider"
        >
          Product Available
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending || uploading}
        className="w-full bg-chred px-5 py-4 text-xs font-extrabold uppercase tracking-[.15em] text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading
          ? "Uploading Images..."
          : pending
            ? "Saving Product..."
            : submitLabel}
      </button>
    </form>
  );
}