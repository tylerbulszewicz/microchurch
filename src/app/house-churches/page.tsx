import type { Metadata } from "next";
import { HouseChurchesContentSection } from "@/components/HouseChurchesContentSection";
import { HouseChurchesHero } from "@/components/HouseChurchesHero";
import { Navbar } from "@/components/Navbar";
import { siteUrl } from "@/lib/site";

const hcTitle = "House church in Charlotte";
const hcDescription =
	"We use “house church” and “microchurch” to describe simple, relational gatherings in Charlotte, NC. Learn what that means and how to connect with others.";

export const metadata: Metadata = {
	title: hcTitle,
	description: hcDescription,
	alternates: { canonical: `${siteUrl}/house-churches` },
	openGraph: {
		title: hcTitle,
		description: hcDescription,
		url: `${siteUrl}/house-churches`,
		images: [
			{ url: "/opengraph-image", width: 1200, height: 630, alt: "Charlotte Microchurch" },
		],
	},
	twitter: {
		card: "summary_large_image",
		title: hcTitle,
		description: hcDescription,
		images: ["/opengraph-image"],
	},
};

export default function HouseChurchesPage() {
	return (
		<div className="w-full">
			<div className="relative min-h-dvh">
				<div className="absolute top-0 right-0 left-0 z-20">
					<Navbar overHero />
				</div>
				<HouseChurchesHero />
			</div>
			<HouseChurchesContentSection />
		</div>
	);
}
