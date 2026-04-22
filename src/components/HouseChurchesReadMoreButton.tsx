"use client";

import { Button } from "@/components/Button";
import type { MouseEvent } from "react";
import { scrollToCurrentHash, scrollToElementId } from "@/lib/hashScroll";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SECTION_ID = "house-churches-read-more";

export function HouseChurchesReadMoreButton() {
	const pathname = usePathname();
	const rafId = useRef<{ a?: number; b?: number }>({});

	useEffect(() => {
		if (pathname !== "/house-churches") return;
		rafId.current.a = requestAnimationFrame(() => {
			rafId.current.b = requestAnimationFrame(() => {
				scrollToCurrentHash();
			});
		});
		return () => {
			if (rafId.current.a) cancelAnimationFrame(rafId.current.a);
			if (rafId.current.b) cancelAnimationFrame(rafId.current.b);
		};
	}, [pathname]);

	return (
		<Button
			className="font-marcellus min-h-11 !text-[20px] px-8 py-3 leading-tight"
			href={`#${SECTION_ID}`}
			onClick={(e: MouseEvent<HTMLAnchorElement>) => {
				if (pathname === "/house-churches") {
					e.preventDefault();
					scrollToElementId(SECTION_ID);
				}
			}}
		>
			Read more
		</Button>
	);
}
