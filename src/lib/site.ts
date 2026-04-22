/**
 * Canonical site URL for metadata, sitemap, and JSON-LD. Set in production via env.
 * Example: https://yoursite.com (no trailing slash)
 */
export const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://charlottemicrochurch.com"
).replace(/\/$/, "");

export const siteName = "Charlotte Microchurch";

export const defaultDescription =
	"Charlotte Microchurch is a network of simple churches and house churches in Charlotte, North Carolina. Discover gatherings, connect with others, and live out a kingdom approach to church in your neighborhood.";

export const defaultKeywords: string[] = [
	"Charlotte microchurch",
	"Charlotte house church",
	"simple church",
	"Charlotte NC church",
	"kingdom",
	"house church Charlotte",
];
