"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { db } from "@/drizzle/db";
import { siteSettings } from "@/drizzle/schema";
import { authOptions } from "@/lib/auth";

const siteSettingsSchema = z.object({
  storefrontHeadline: z.string().trim().min(1).max(160),
  storefrontSubtitle: z.string().trim().min(1).max(500),
  storefrontCta: z.string().trim().min(1).max(80),
  logoUrl: z.string().trim().max(500).default(""),
  location: z.string().trim().min(1).max(120),
  supportHours: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(80).default(""),
  footerText: z.string().trim().min(1).max(220),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  const payload = siteSettingsSchema.parse({
    storefrontHeadline: formData.get("storefrontHeadline")?.toString() ?? "",
    storefrontSubtitle: formData.get("storefrontSubtitle")?.toString() ?? "",
    storefrontCta: formData.get("storefrontCta")?.toString() ?? "",
    logoUrl: formData.get("logoUrl")?.toString() ?? "",
    location: formData.get("location")?.toString() ?? "",
    supportHours: formData.get("supportHours")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    footerText: formData.get("footerText")?.toString() ?? "",
  });

  const existing = await db.select().from(siteSettings).limit(1);

  if (existing.length > 0) {
    await db
      .update(siteSettings)
      .set({
        storefrontHeadline: payload.storefrontHeadline,
        storefrontSubtitle: payload.storefrontSubtitle,
        storefrontCta: payload.storefrontCta,
        logoUrl: payload.logoUrl,
        location: payload.location,
        supportHours: payload.supportHours,
        phone: payload.phone,
        footerText: payload.footerText,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, existing[0].id));
  } else {
    await db.insert(siteSettings).values({
      storefrontHeadline: payload.storefrontHeadline,
      storefrontSubtitle: payload.storefrontSubtitle,
      storefrontCta: payload.storefrontCta,
      logoUrl: payload.logoUrl,
      location: payload.location,
      supportHours: payload.supportHours,
      phone: payload.phone,
      footerText: payload.footerText,
      updatedAt: new Date(),
    });
  }

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}
