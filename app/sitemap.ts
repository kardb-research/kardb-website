
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kardb.com";

  const publicPages = [
    "",
    "/research",
    "/reports",
    "/methodology",
    "/pricing",
    "/about",
    "/faq",
    "/regulatory",
    "/regulatory/sebi-registration",
    "/regulatory/investor-charter",
    "/regulatory/complaints",
    "/regulatory/grievance",
    "/regulatory/terms",
    "/regulatory/mitc",
    "/regulatory/fees",
    "/regulatory/conflict",
    "/regulatory/ai-disclosure",
    "/regulatory/audit",
    "/regulatory/disclaimers",
  ];

  return publicPages.map((page) => ({
    url: `${baseUrl}${page}`,
  }));
}
