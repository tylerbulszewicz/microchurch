/**
 * Scroll to an in-page id with smooth behavior when motion is allowed.
 */
export function scrollToElementId(id: string) {
	if (typeof document === "undefined") return;
	const el = document.getElementById(id);
	if (!el) return;
	const reduce =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function getHashId(): string | null {
	if (typeof window === "undefined") return null;
	const id = window.location.hash.replace(/^#/, "");
	return id || null;
}

export function scrollToCurrentHash() {
	const id = getHashId();
	if (id) scrollToElementId(id);
}
