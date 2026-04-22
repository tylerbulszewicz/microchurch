import type { Metadata, Viewport } from "next";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Footer } from "@/components/Footer";
import { defaultDescription, defaultKeywords, siteName, siteUrl } from "@/lib/site";
import localFont from "next/font/local";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const marcellus = localFont({
	src: "../../public/fonts/Marcellus-Regular.ttf",
	variable: "--font-marcellus",
	weight: "400",
	display: "swap",
});

const interTight = Inter_Tight({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter-tight",
	weight: "variable",
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
		{ media: "(prefers-color-scheme: dark)", color: "#121212" },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${siteName} | Simple & house churches in Charlotte, NC`,
		template: `%s | ${siteName}`,
	},
	description: defaultDescription,
	keywords: defaultKeywords,
	applicationName: siteName,
	category: "religion",
	robots: {
		index: true,
		follow: true,
		googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
	},
	icons: {
		icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
	},
	appleWebApp: {
		title: siteName,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName,
		title: `${siteName} | Simple & house churches in Charlotte, NC`,
		description: defaultDescription,
		url: siteUrl,
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Charlotte Microchurch",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteName} | Simple & house churches in Charlotte, NC`,
		description: defaultDescription,
		images: ["/opengraph-image"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${interTight.variable} ${marcellus.variable}`}>
			<body className="m-0 min-h-dvh bg-[#121212] text-white">
				<SeoJsonLd />
				{children}
				<Footer />
			</body>
		</html>
	);
}
