import configJson from "./config.json";

/** App metadata: name, logo, description, theme, PWA icons, etc. Edit config.json to change. */
export type SiteConfig = typeof configJson;

export const siteConfig: SiteConfig = configJson;
