const EMAIL_HREF = "mailto:charlottemicrochurch@gmail.com";
const EMAIL_LABEL = "Charlottemicrochurch@gmail.com";

export function Footer() {
	return (
		<footer className="w-full bg-[#121212] text-white">
			<div className="mx-auto flex w-full max-w-[1200px] flex-col items-stretch gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-10 md:py-14">
				<p className="text-left text-base sm:text-lg md:max-w-md">
					May His will be done in Charlotte.
				</p>
				<div className="flex flex-col items-start text-left md:items-end md:text-right">
					<p className="text-xl font-normal sm:text-2xl">Charlotte Microchurch</p>
					<a
						className="mt-1 text-sm text-white/95 underline decoration-white/50 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
						href={EMAIL_HREF}
					>
						{EMAIL_LABEL}
					</a>
				</div>
			</div>
		</footer>
	);
}
