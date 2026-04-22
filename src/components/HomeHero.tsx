import { Button } from "@/components/Button";

const HERO_IMAGE = "/images/headerbgimg.png";

export function HomeHero() {
	return (
		<section
			className="relative h-dvh w-full overflow-hidden bg-zinc-900 bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
			aria-label="Decorative full-page photograph behind the home hero, suggesting community in Charlotte"
		>
			{/* Slight left emphasis so the headline stays legible on varied imagery */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"
			/>
			<div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col items-start justify-end gap-0 px-5 pt-0 pb-24 min-[400px]:pb-28 sm:px-8 sm:pb-32 md:pb-40 lg:pb-48">
				<h1 className="mb-6 max-w-2xl text-balance text-[48px] font-normal leading-[1.12] text-white">
					Discover a Kingdom Approach to Church
				</h1>
				<p className="font-marcellus mb-12 w-full max-w-[min(100%,22ch)] text-pretty text-[24px] leading-[1.3] text-white/75">
					Yes, micro-churches and house churches exist in Charlotte.
				</p>
				<div>
					<Button
						className="font-marcellus min-h-11 !text-[20px] px-8 py-3 leading-tight"
						href="/connect"
					>
						Find a Gathering
					</Button>
				</div>
			</div>
		</section>
	);
}
