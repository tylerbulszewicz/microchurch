import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	return [
		{ url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
		{ url: `${siteUrl}/connect`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
		{
			url: `${siteUrl}/house-churches`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.85,
		},
	];
}
