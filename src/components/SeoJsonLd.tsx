import { defaultDescription, siteName, siteUrl } from "@/lib/site";

export function SeoJsonLd() {
	const data = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteName,
		description: defaultDescription,
		url: siteUrl,
		contactPoint: {
			"@type": "ContactPoint",
			email: "charlottemicrochurch@gmail.com",
			contactType: "inquiries",
		},
		areaServed: {
			"@type": "Place",
			name: "Charlotte, North Carolina",
		},
	} as const;

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
