"use client";

import { scrollToElementId } from "@/lib/hashScroll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState, type MouseEvent } from "react";

const navItems = [
	{ id: "home" as const, label: "Home", href: "/" },
	{ id: "where-we-are" as const, label: "Where we are", href: "/#where-we-are" },
	{ id: "house-churches" as const, label: "House Churches?", href: "/house-churches" },
] as const;

type NavbarProps = {
	/** Light text and controls for use over the hero image */
	overHero?: boolean;
	/**
	 * When true (e.g. home), the bar fades in last, after the hero CTA button entrance.
	 */
	heroEntrance?: boolean;
};

const useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;

function getHomeScrollSegment(): "home" | "where-we-are" {
	if (typeof document === "undefined") return "home";
	const h = window.innerHeight;
	const sc = window.scrollY;
	const el = document.getElementById("where-we-are");
	if (!el) return "home";
	const rect = el.getBoundingClientRect();
	// "Where we are" — section in view in the upper/visible focus, or passed (stay highlighted)
	if (
		(rect.top < h * 0.5 && rect.bottom > 0) ||
		(rect.top < 0 && rect.bottom > 0) ||
		(rect.bottom < 0 && sc > 200)
	) {
		return "where-we-are";
	}
	return "home";
}

export function Navbar({ overHero = false, heroEntrance = false }: NavbarProps) {
	const pathname = usePathname();
	const [homeScrollSegment, setHomeScrollSegment] = useState<"home" | "where-we-are">("home");

	useIsomorphicLayoutEffect(() => {
		if (pathname !== "/") return;

		const onScroll = () => {
			setHomeScrollSegment(getHomeScrollSegment());
		};

		onScroll();
		// Re-read after the browser may have applied a hash (e.g. /#where-we-are)
		requestAnimationFrame(onScroll);
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		window.addEventListener("hashchange", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			window.removeEventListener("hashchange", onScroll);
		};
	}, [pathname]);

	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!menuOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [menuOpen]);

	useEffect(() => {
		if (typeof window === "undefined" || !window.matchMedia) return;
		const mq = window.matchMedia("(min-width: 768px)");
		const onChange = () => {
			if (mq.matches) setMenuOpen(false);
		};
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	useEffect(() => {
		if (!menuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menuOpen]);

	const onNavItemClick =
		(mobile: boolean) =>
		(item: (typeof navItems)[number]) =>
		(e: MouseEvent<HTMLAnchorElement>) => {
			if (mobile) setMenuOpen(false);
			if (item.id === "where-we-are" && item.href === "/#where-we-are" && pathname === "/") {
				e.preventDefault();
				scrollToElementId("where-we-are");
				window.history.pushState(null, "", "/#where-we-are");
				setHomeScrollSegment("where-we-are");
			}
		};

	const brand = overHero
		? "shrink-0 text-base font-semibold leading-relaxed tracking-tight text-white sm:text-lg"
		: "shrink-0 text-base font-semibold leading-relaxed tracking-tight text-zinc-900 sm:text-lg";
	const link = overHero
		? "whitespace-nowrap text-base leading-relaxed text-white/85 transition-[color,background-color,decoration] hover:text-white sm:text-lg"
		: "whitespace-nowrap text-base leading-relaxed text-zinc-700 transition-[color,background-color,decoration] hover:text-zinc-900 sm:text-lg";
	const linkUnderline = overHero
		? "border-b-2 border-white/90 text-white"
		: "border-b-2 border-zinc-900 text-zinc-900";
	const linkNoUnderline = overHero
		? "border-b-2 border-transparent"
		: "border-b-2 border-transparent";
	const connect = overHero
		? "shrink-0 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-base font-medium leading-relaxed text-zinc-900 transition-colors hover:!bg-[#121212] hover:!text-white sm:px-5 sm:text-lg"
		: "shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-base font-medium leading-relaxed text-white transition-colors hover:!bg-[#f7f4ef] hover:!text-[#121212] sm:px-5 sm:text-lg";
	const connectClass =
		pathname === "/connect" && overHero
			? "shrink-0 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-base font-medium leading-relaxed text-zinc-900 ring-2 ring-white transition-colors hover:!bg-[#121212] hover:!text-white sm:px-5 sm:text-lg"
			: pathname === "/connect" && !overHero
				? "shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-base font-medium leading-relaxed text-white ring-2 ring-zinc-900 transition-colors hover:!bg-[#f7f4ef] hover:!text-[#121212] sm:px-5 sm:text-lg"
				: connect;

	const mobilePanel =
		overHero
			? "bg-[#121212] text-white"
			: "bg-[#f7f4ef] text-zinc-900";
	const hamburgerClass = overHero
		? "text-white"
		: "text-zinc-900";
	const headerBar = menuOpen
		? overHero
			? "bg-[#121212]"
			: "bg-[#f7f4ef] shadow-sm"
		: "";

	return (
		<>
			{menuOpen && <div className="h-[4.5rem] w-full md:hidden" aria-hidden />}
		<header
			className={`font-marcellus pointer-events-auto w-full ${
				menuOpen
					? "fixed top-0 right-0 left-0 z-[120] w-full"
					: "relative z-[100] bg-transparent"
			} ${headerBar}`}
		>
			{menuOpen && (
				<div
					className={`fixed inset-0 z-[110] flex min-h-dvh w-full flex-col overflow-y-auto pt-20 ${mobilePanel} md:hidden`}
					id="mobile-menu-panel"
					role="dialog"
					aria-modal="true"
					aria-label="Site menu"
					tabIndex={-1}
				>
					<div
						role="region"
						aria-label="Page links"
						className="flex min-h-0 flex-1 flex-col items-stretch px-6 pb-10"
					>
						<ul className="m-0 flex shrink-0 list-none flex-col items-stretch gap-0 p-0">
							{navItems.map((item) => {
								const isActive =
									item.id === "house-churches"
										? pathname === "/house-churches"
										: pathname === "/" && homeScrollSegment === item.id;
								const isHomeHash = item.id === "where-we-are" && item.href === "/#where-we-are";
								const mobileLinkActive = isActive
									? overHero
										? " text-white"
										: " text-zinc-900"
									: "";
								return (
									<li key={item.id} className="w-full text-left">
										<Link
											href={item.href}
											scroll={isHomeHash ? false : true}
											onClick={onNavItemClick(true)(item)}
											className={`${link} block border-0 py-4 text-left text-2xl font-bold leading-snug sm:text-3xl${mobileLinkActive}`}
											aria-current={isActive ? "page" : undefined}
										>
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
						<div
							className={`mt-auto w-full shrink-0 border-t pt-6 ${
								overHero ? "border-white/20" : "border-zinc-300"
							}`}
						>
							<Link
								href="/connect"
								onClick={() => setMenuOpen(false)}
								className={`${connectClass} inline-flex items-center justify-center self-start text-xl !font-bold sm:px-8 sm:py-3 sm:text-2xl`}
								aria-current={pathname === "/connect" ? "page" : undefined}
							>
								Connect
							</Link>
						</div>
					</div>
				</div>
			)}
			<nav
				className={`relative z-[120] flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5${
					heroEntrance ? " hero-fade-in-delay-3" : ""
				}`}
				aria-label="Main"
			>
				<Link
					href="/"
					className={brand}
					onClick={menuOpen ? () => setMenuOpen(false) : undefined}
				>
					Charlotte Microchurch
				</Link>
				<div className="hidden min-w-0 flex-wrap items-center justify-end gap-3 sm:gap-6 md:flex md:gap-8">
					<ul className="m-0 flex list-none flex-wrap items-center justify-end gap-3 sm:gap-5 md:gap-8 p-0">
						{navItems.map((item) => {
							const isActive =
								item.id === "house-churches"
									? pathname === "/house-churches"
									: pathname === "/" && homeScrollSegment === item.id;
							const isHomeHash = item.id === "where-we-are" && item.href === "/#where-we-are";
							return (
								<li key={item.id}>
									<Link
										href={item.href}
										scroll={isHomeHash ? false : true}
										onClick={onNavItemClick(false)(item)}
										className={`${link} ${isActive ? linkUnderline : linkNoUnderline} inline-block pb-0.5`}
										aria-current={isActive ? "page" : undefined}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
					<Link
						href="/connect"
						className={connectClass}
						aria-current={pathname === "/connect" ? "page" : undefined}
					>
						Connect
					</Link>
				</div>
				<div className="md:hidden pointer-events-auto">
					<button
						type="button"
						className={`-mx-2 inline-flex h-12 min-h-[44px] w-12 min-w-[44px] translate-y-0.5 items-center justify-center p-0 ${hamburgerClass} touch-manipulation cursor-pointer`}
						onClick={() => setMenuOpen((o) => !o)}
						aria-expanded={menuOpen}
						aria-controls="mobile-menu-panel"
					>
						<span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
						<span className="relative block h-5 w-6" aria-hidden>
							{/* Center each bar on its line; open state shares one pivot so the X lines cross evenly */}
							<span
								className={`absolute left-0 block h-0.5 w-6 origin-center bg-current transition-all duration-200 ease-out ${
									menuOpen
										? "top-1/2 -translate-y-1/2 rotate-45"
										: "top-[calc(50%-3px)] -translate-y-1/2 rotate-0"
								}`}
							/>
							<span
								className={`absolute left-0 block h-0.5 w-6 origin-center bg-current transition-all duration-200 ease-out ${
									menuOpen
										? "top-1/2 -translate-y-1/2 -rotate-45"
										: "top-[calc(50%+3px)] -translate-y-1/2 rotate-0"
								}`}
							/>
						</span>
					</button>
				</div>
			</nav>
		</header>
		</>
	);
}
