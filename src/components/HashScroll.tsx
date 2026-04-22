"use client";

import { scrollToCurrentHash } from "@/lib/hashScroll";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * On the home route, keep fragment navigation smooth: direct loads, client
 * navigations from other pages, and hash changes (e.g. back/forward).
 */
export function HashScroll() {
	const pathname = usePathname();
	const rafId = useRef<{ a?: number; b?: number }>({});

	useEffect(() => {
		if (pathname !== "/") return;

		const onHashChange = () => {
			scrollToCurrentHash();
		};

		// Defer so layout + scroll position from Next match the final URL
		rafId.current.a = requestAnimationFrame(() => {
			rafId.current.b = requestAnimationFrame(() => {
				scrollToCurrentHash();
			});
		});

		window.addEventListener("hashchange", onHashChange);
		return () => {
			if (rafId.current.a) cancelAnimationFrame(rafId.current.a);
			if (rafId.current.b) cancelAnimationFrame(rafId.current.b);
			window.removeEventListener("hashchange", onHashChange);
		};
	}, [pathname]);

	return null;
}
