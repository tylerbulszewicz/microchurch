import { HouseChurchesReadMoreButton } from "@/components/HouseChurchesReadMoreButton";

const HERO_IMAGE = "/images/houses.jpg";

export function HouseChurchesHero() {
	return (
		<section
			className="relative h-dvh w-full overflow-hidden bg-zinc-900 bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
			aria-label="Neighborhood house photograph behind the page hero, for the house churches topic"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-black/65"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent"
			/>
			<div className="relative z-10 mx-auto flex h-full w-full min-h-0 max-w-[1200px] flex-col items-start justify-end gap-0 px-5 pt-24 pb-24 min-[400px]:pb-28 sm:px-8 sm:pb-32 md:pb-40 lg:pb-48">
				<h1 className="m-0 mb-6 max-w-2xl text-balance text-[48px] font-normal leading-[1.12] text-white">
					We Use &ldquo;House Church&rdquo; and &ldquo;Microchurch&rdquo; Interchangeably
				</h1>
				<p className="font-marcellus mb-12 w-full max-w-[min(100%,22ch)] text-pretty text-[24px] leading-[1.3] text-white/75">
					We&rsquo;ve added this page to help those searching for house churches in Charlotte find us
					more easily.
				</p>
				<div>
					<HouseChurchesReadMoreButton />
				</div>
			</div>
		</section>
	);
}
