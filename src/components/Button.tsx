import Link, { type LinkProps } from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonClassName =
	"inline-flex min-h-11 min-w-0 items-center justify-center rounded-full border border-transparent bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:!bg-[#121212] hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400/70";

type ButtonAsLink = {
	children: ReactNode;
	className?: string;
	href: LinkProps["href"];
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = {
	children: ReactNode;
	className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonAsLink | ButtonAsButton) {
	if ("href" in props) {
		const { children, className, href, ...linkRest } = props;
		return (
			<Link
				href={href}
				className={`${buttonClassName} ${className ?? ""}`}
				{...linkRest}
			>
				{children}
			</Link>
		);
	}
	const { children, className, type = "button", ...buttonRest } = props;
	return (
		<button
			type={type}
			className={`${buttonClassName} ${className ?? ""}`}
			{...buttonRest}
		>
			{children}
		</button>
	);
}
