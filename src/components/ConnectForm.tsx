"use client";

import { type FormEvent, useId, useState } from "react";

const MAIL = "charlottemicrochurch@gmail.com";

export function ConnectForm() {
	const baseId = useId();
	const [error, setError] = useState<string | null>(null);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		const form = e.currentTarget;
		const fd = new FormData(form);
		const honeypot = String(fd.get("botcheck") ?? "").trim();
		if (honeypot.length > 0) {
			setError("Unable to send your message. Please try again.");
			return;
		}
		const first = String(fd.get("firstName") ?? "").trim();
		const last = String(fd.get("lastName") ?? "").trim();
		const email = String(fd.get("email") ?? "").trim();
		const message = String(fd.get("message") ?? "").trim();
		if (!first || !last || !email) {
			setError("Please fill in your name and email.");
			return;
		}
		const body = [
			`Name: ${first} ${last}`,
			`Email: ${email}`,
			"",
			"Message:",
			message || "(no message provided)",
		].join("\n");
		const subject = "Connect with Us — Microchurch";
		// searchParams so To / Subject / Body are set correctly in Mail, Apple Mail, Outlook, Gmail, etc.
		const mail = new URL(`mailto:${MAIL}`);
		mail.searchParams.set("subject", subject);
		mail.searchParams.set("body", body);
		window.location.assign(mail.toString());
	}

	return (
		<form
			className="relative flex w-full min-w-0 max-w-lg flex-col gap-6"
			onSubmit={onSubmit}
			noValidate
		>
			<div
				className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
				aria-hidden
			>
				<label htmlFor={`${baseId}-hp`}>Do not fill this out</label>
				<input
					id={`${baseId}-hp`}
					name="botcheck"
					type="text"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>
			{error && (
				<p className="m-0 text-sm text-red-700" role="alert">
					{error}
				</p>
			)}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
				<div className="flex flex-col gap-1.5">
					<label
						className="font-inter-tight text-sm font-medium text-zinc-800"
						htmlFor={`${baseId}-first`}
					>
						First Name <span className="text-zinc-500">(required)</span>
					</label>
					<input
						id={`${baseId}-first`}
						name="firstName"
						type="text"
						autoComplete="given-name"
						required
						className="font-inter-tight w-full min-h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
					/>
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						className="font-inter-tight text-sm font-medium text-zinc-800"
						htmlFor={`${baseId}-last`}
					>
						Last Name <span className="text-zinc-500">(required)</span>
					</label>
					<input
						id={`${baseId}-last`}
						name="lastName"
						type="text"
						autoComplete="family-name"
						required
						className="font-inter-tight w-full min-h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-1.5">
				<label
					className="font-inter-tight text-sm font-medium text-zinc-800"
					htmlFor={`${baseId}-email`}
				>
					Email <span className="text-zinc-500">(required)</span>
				</label>
				<input
					id={`${baseId}-email`}
					name="email"
					type="email"
					autoComplete="email"
					inputMode="email"
					required
					className="font-inter-tight w-full min-h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
				/>
			</div>
			<div className="flex flex-col gap-1.5">
				<label className="font-inter-tight text-sm font-medium text-zinc-800" htmlFor={`${baseId}-msg`}>
					Message
				</label>
				<textarea
					id={`${baseId}-msg`}
					name="message"
					rows={5}
					className="font-inter-tight w-full min-h-28 resize-y rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
				/>
			</div>
			<div className="flex flex-col items-start gap-2">
				<button
					type="submit"
					className="font-marcellus inline-flex min-h-11 min-w-0 items-center justify-center rounded-full border border-transparent bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition-[background-color,transform] hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 sm:text-base"
				>
					SEND
				</button>
				<p className="m-0 max-w-md font-inter-tight text-sm leading-relaxed text-zinc-500">
					Opens your email with everything filled in. Then press send in your email app to deliver.
				</p>
			</div>
		</form>
	);
}
