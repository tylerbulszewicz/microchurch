"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image, { type StaticImageData } from "next/image";

type MapImageLightboxProps = {
	mapSrc: string | StaticImageData;
	thumbnailWidth: number;
	thumbnailHeight: number;
	thumbnailClassName: string;
	sizes: string;
};

function CloseIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden
		>
			<path
				d="M6 6L18 18M6 18L18 6"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function MapImageLightbox({
	mapSrc,
	thumbnailWidth,
	thumbnailHeight,
	thumbnailClassName,
	sizes,
}: MapImageLightboxProps) {
	const [open, setOpen] = useState(false);
	const titleId = useId();
	const close = useCallback(() => setOpen(false), []);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			document.removeEventListener("keydown", onKey);
		};
	}, [open, close]);

	return (
		<>
			<button
				type="button"
				className="group block w-full cursor-pointer rounded-sm border-0 bg-transparent p-0 text-left transition-opacity hover:opacity-95 md:w-fit"
				onClick={() => setOpen(true)}
				aria-haspopup="dialog"
				aria-expanded={open}
			>
				<span className="sr-only">Open map in full view</span>
				<Image
					src={mapSrc}
					alt="Map of microchurch gatherings in Charlotte — open full size"
					width={thumbnailWidth}
					height={thumbnailHeight}
					quality={90}
					className={thumbnailClassName}
					sizes={sizes}
					priority
					loading="eager"
				/>
			</button>

			{open && (
				<div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby={titleId}>
					{/* Full-screen dim; receives any click that isn’t stopped by the image */}
					<button
						type="button"
						className="absolute inset-0 z-0 border-0 bg-black/80 p-0"
						onClick={close}
						aria-label="Close map"
					/>
					<h2 id={titleId} className="sr-only">
						Map, full size
					</h2>
					{/* Invisible full-screen pass-through, then a tight w-fit box so dim edges hit the button above */}
					<div className="absolute inset-0 z-[1] flex items-center justify-center p-4 sm:p-8 pointer-events-none">
						{/*
						  Tight w-fit to box only the image (dim clicks go to backdrop).
						  Size: as large as fits — up to 80vh tall, 96vw wide (square source uses the smaller).
						*/}
						<div
							className="pointer-events-auto w-fit max-w-[min(96vw,1600px)]"
							role="presentation"
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={mapSrc}
								alt="Map of microchurch gatherings in Charlotte"
								width={thumbnailWidth}
								height={thumbnailHeight}
								quality={90}
								className="h-[min(80vh,96vw)] w-[min(80vh,96vw)] max-h-[80vh] max-w-[min(96vw,80vh)] object-contain"
								sizes="100vw"
							/>
						</div>
					</div>
					<button
						type="button"
						className="fixed right-4 top-4 z-[2] border-0 bg-transparent p-2 text-white transition-opacity hover:opacity-80 sm:right-6 sm:top-6"
						onClick={(e) => {
							e.stopPropagation();
							close();
						}}
						aria-label="Close"
					>
						<CloseIcon className="h-8 w-8 text-white" />
					</button>
				</div>
			)}
		</>
	);
}
