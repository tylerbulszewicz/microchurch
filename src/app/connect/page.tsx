import type { Metadata } from "next";
import { ConnectForm } from "@/components/ConnectForm";
import { Navbar } from "@/components/Navbar";
import { siteUrl } from "@/lib/site";
import charlotteImage from "../../../public/images/charlottecity.webp";
import Image from "next/image";

const connectTitle = "Connect with us";
const connectDescription =
	"Reach out to find or start a microchurch or house church in Charlotte, North Carolina. Share your name, email, and message, and we will get back to you.";

export const metadata: Metadata = {
	title: connectTitle,
	description: connectDescription,
	alternates: { canonical: `${siteUrl}/connect` },
	openGraph: {
		title: connectTitle,
		description: connectDescription,
		url: `${siteUrl}/connect`,
		images: [
			{ url: "/opengraph-image", width: 1200, height: 630, alt: "Charlotte Microchurch" },
		],
	},
	twitter: {
		card: "summary_large_image",
		title: connectTitle,
		description: connectDescription,
		images: ["/opengraph-image"],
	},
};

export default function ConnectPage() {
	return (
		<div className="flex min-h-dvh w-full flex-col bg-[#f7f4ef] text-zinc-900">
			<header className="shrink-0">
				<Navbar />
			</header>
			<main className="mx-auto w-full min-h-0 max-w-[1200px] flex-1 px-5 py-10 sm:px-8 sm:py-12 md:py-16">
				<div className="grid w-full min-h-0 grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
					<div className="order-1 flex min-w-0 max-w-2xl flex-col justify-center">
						<h1 className="m-0 text-balance text-3xl font-normal leading-tight text-zinc-900 sm:text-4xl md:text-5xl">
							Connect with Us
						</h1>
						<p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:mt-5 sm:text-lg">
							If you&rsquo;re interested in starting or finding a microchurch, please provide your
							information, and we will contact you. We look forward to connecting!
						</p>
						<div className="mt-8 sm:mt-10">
							<ConnectForm />
						</div>
					</div>
					<div className="order-2 flex w-full min-w-0 items-center justify-center md:justify-end">
						<div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]">
							<Image
								src={charlotteImage}
								alt="Charlotte, North Carolina skyline and city view beside the connect form"
								placeholder="blur"
								priority
								sizes="(max-width: 639px) 360px, (max-width: 1023px) 420px, 520px"
								className="h-auto w-full shadow-[0_0_24px_rgba(0,0,0,0.12)]"
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
