import { siteConfig } from "@/config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: siteConfig.startUrl,
    display: siteConfig.display as MetadataRoute.Manifest["display"],
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    lang: siteConfig.lang,
    icons: siteConfig.icons as MetadataRoute.Manifest["icons"],
  };
}
