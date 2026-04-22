import type { Metadata } from "next";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import { ConnectWorkersSection } from "@/components/ConnectWorkersSection";
import { HashScroll } from "@/components/HashScroll";
import { HomeHero } from "@/components/HomeHero";
import { Navbar } from "@/components/Navbar";
import { WhereWeAreSection } from "@/components/WhereWeAreSection";

export const metadata: Metadata = {
	description: defaultDescription,
	alternates: { canonical: siteUrl },
	openGraph: {
		url: siteUrl,
		images: [
			{ url: "/opengraph-image", width: 1200, height: 630, alt: "Charlotte Microchurch" },
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteName} | Simple & house churches in Charlotte, NC`,
		description: defaultDescription,
		images: ["/opengraph-image"],
	},
};

export default function Home() {
	return (
		<div className="w-full">
			<HashScroll />
			<div className="relative min-h-dvh">
				<div className="absolute top-0 right-0 left-0 z-50">
					<Navbar overHero heroEntrance />
				</div>
				<HomeHero />
			</div>
			<ConnectWorkersSection />
			<WhereWeAreSection />
		</div>
	);
}
