import mapImage from "../../public/images/map.png";

import { Button } from "@/components/Button";
import { MapImageLightbox } from "@/components/MapImageLightbox";

export function WhereWeAreSection() {
	return (
		<section
			className="w-full scroll-mt-20 bg-[#f7f4ef] py-10 sm:py-12 md:py-16"
			id="where-we-are"
		>
			<div className="mx-auto w-full min-h-0 max-w-[1200px] px-5 sm:px-8">
				<div className="grid w-full min-h-0 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
					<div className="flex w-full min-w-0 justify-center md:justify-start">
						<MapImageLightbox
							mapSrc={mapImage}
							thumbnailWidth={mapImage.width}
							thumbnailHeight={mapImage.height}
							thumbnailClassName="h-auto w-full shadow-[0_0_24px_rgba(0,0,0,0.12)] md:max-w-[320px]"
							sizes="(max-width: 767px) 100vw, 320px"
						/>
					</div>

					<div className="flex w-full min-w-0 min-h-0 max-w-2xl flex-col justify-center">
						<h2 className="mb-6 max-w-2xl text-balance text-[48px] font-normal leading-[1.12] text-zinc-900">
							The Kingdom is Growing
						</h2>
						<p className="mb-8 max-w-xl text-pretty text-[24px] leading-[1.3] text-zinc-600 md:mb-10">
							Help saturate the city with new or current gatherings
						</p>
						<div>
							<Button
								className="font-marcellus min-h-11 !bg-[#121212] !text-[#f7f4ef] !text-[20px] hover:!bg-[#f7f4ef] hover:!text-[#121212] px-8 py-3 leading-tight"
								href="/connect"
							>
								Add to the Kingdom
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
