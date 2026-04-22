"use client";

import { type FormEvent, useId, useState } from "react";

/** Server handler adds the Web3Forms access key (from Worker `vars`, not the client bundle). */
const CONTACT_API = "/api/contact";

type SubmitState = "idle" | "sending" | "success";

export function ConnectForm() {
	const baseId = useId();
	const [error, setError] = useState<string | null>(null);
	const [state, setState] = useState<SubmitState>("idle");

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
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

		setState("sending");
		try {
			const res = await fetch(CONTACT_API, {
				method: "POST",
				headers: { "Content-Type": "application/json", Accept: "application/json" },
				body: JSON.stringify({
					firstName: first,
					lastName: last,
					email,
					message: message || "",
					botcheck: String(fd.get("botcheck") ?? "").trim(),
				}),
			});
			const data = (await res.json()) as { success?: boolean; message?: string; error?: string };
			if (res.ok && data.success) {
				setState("success");
				form.reset();
			} else {
				setState("idle");
				const msg = data.message ?? data.error ?? "Something went wrong. Please try again in a few minutes.";
				setError(msg);
			}
		} catch {
			setState("idle");
			setError("Network error. Check your connection and try again.");
		}
	}

	if (state === "success") {
		return (
			<div
				className="font-inter-tight w-full min-w-0 max-w-lg rounded-md border border-zinc-300 bg-zinc-50 px-4 py-6 sm:px-6"
				role="status"
			>
				<p className="m-0 text-base font-medium text-zinc-900 sm:text-lg">Thanks — we received your message.</p>
				<p className="mt-2 m-0 text-sm leading-relaxed text-zinc-600">
					We&rsquo;ll be in touch at the email you provided.
				</p>
				<button
					type="button"
					className="font-inter-tight mt-5 min-h-10 text-sm font-medium text-zinc-800 underline decoration-zinc-400 underline-offset-4 transition-colors hover:text-zinc-600"
					onClick={() => {
						setState("idle");
						setError(null);
					}}
				>
					Send another message
				</button>
			</div>
		);
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
						disabled={state === "sending"}
						className="font-inter-tight w-full min-h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 disabled:cursor-not-allowed disabled:opacity-60"
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
						disabled={state === "sending"}
						className="font-inter-tight w-full min-h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 disabled:cursor-not-allowed disabled:opacity-60"
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
					disabled={state === "sending"}
					className="font-inter-tight w-full min-h-10 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 disabled:cursor-not-allowed disabled:opacity-60"
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
					disabled={state === "sending"}
					className="font-inter-tight w-full min-h-28 resize-y rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-[border-color] placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 disabled:cursor-not-allowed disabled:opacity-60"
				/>
			</div>
			<div className="flex flex-col items-start gap-2">
				<button
					type="submit"
					disabled={state === "sending"}
					className="font-marcellus inline-flex min-h-11 min-w-0 items-center justify-center rounded-full border border-transparent bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition-[background-color,transform] enabled:hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
				>
					{state === "sending" ? "Sending…" : "SEND"}
				</button>
				<p className="m-0 max-w-md font-inter-tight text-sm leading-relaxed text-zinc-500">
					Submits through Web3Forms so we can reply by email. We don&rsquo;t add you to a list from this
					form.
				</p>
			</div>
		</form>
	);
}
