"use client";

import { useState } from "react";
import { saveSiteSettings } from "@/actions/site";
import type { SiteSettings } from "@/lib/site-content";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      const uploadedUrl = data.images?.[0]?.url;
      if (!uploadedUrl) {
        throw new Error("No image URL returned");
      }

      setLogoUrl(uploadedUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <form action={saveSiteSettings} className="mt-5 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Hero headline</span>
          <input name="storefrontHeadline" defaultValue={settings.storefrontHeadline} className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Hero CTA</span>
          <input name="storefrontCta" defaultValue={settings.storefrontCta} className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Hero description</span>
        <textarea name="storefrontSubtitle" defaultValue={settings.storefrontSubtitle} rows={4} className="w-full resize-none border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Logo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            disabled={uploading}
            className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500"
          />
          {uploading && <p className="mt-2 text-xs text-ink-soft">Uploading logo...</p>}
          {uploadError && <p className="mt-2 text-xs text-red-500">{uploadError}</p>}
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Logo URL</span>
          <input
            name="logoUrl"
            value={logoUrl}
            onChange={(event) => setLogoUrl(event.target.value)}
            placeholder="https://.../logo.png"
            className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Phone / WhatsApp</span>
          <input name="phone" defaultValue={settings.phone} className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Location</span>
          <input name="location" defaultValue={settings.location} className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Support hours</span>
          <input name="supportHours" defaultValue={settings.supportHours} className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink-soft">Footer text</span>
          <input name="footerText" defaultValue={settings.footerText} className="w-full border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine-500" />
        </label>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="inline-flex items-center bg-pine-500 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white">Save changes</button>
      </div>
    </form>
  );
}
