import { db } from "@/drizzle/db";
import { siteSettings } from "@/drizzle/schema";

export type SiteSettings = {
  storefrontHeadline: string;
  storefrontSubtitle: string;
  storefrontCta: string;
  logoUrl: string;
  location: string;
  supportHours: string;
  phone: string;
  footerText: string;
};

export const defaultSiteSettings: SiteSettings = {
  storefrontHeadline: "Build without doubt.",
  storefrontSubtitle: "Genuine PC components, checked by people who know what they are looking at.",
  storefrontCta: "Browse the bench",
  logoUrl: "",
  location: "Bahawalpur, Pakistan",
  supportHours: "Mon–Sat · 10:00 AM to 8:00 PM",
  phone: "",
  footerText: "The Bahawalpur parts desk for people who care what goes inside the case.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.select().from(siteSettings).limit(1);

    if (rows.length === 0) {
      return defaultSiteSettings;
    }

    const row = rows[0];

    return {
      storefrontHeadline: row.storefrontHeadline || defaultSiteSettings.storefrontHeadline,
      storefrontSubtitle: row.storefrontSubtitle || defaultSiteSettings.storefrontSubtitle,
      storefrontCta: row.storefrontCta || defaultSiteSettings.storefrontCta,
      logoUrl: row.logoUrl || defaultSiteSettings.logoUrl,
      location: row.location || defaultSiteSettings.location,
      supportHours: row.supportHours || defaultSiteSettings.supportHours,
      phone: row.phone || defaultSiteSettings.phone,
      footerText: row.footerText || defaultSiteSettings.footerText,
    };
  } catch {
    return defaultSiteSettings;
  }
}
