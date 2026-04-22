"use client";

import { type FormEvent, useEffect, useId, useState } from "react";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const DEFAULT_SUBJECT = "Connect with Us — Microchurch";
/** One submission per browser; cleared if the user clears site data. */
const STORAGE_KEY = "microchurch.connect.submitted";

type SubmitState = "idle" | "sending" | "success";

type ConnectFormProps = {
	/**
	 * Web3Forms access key, passed from the server component so it’s read at request
	 * time from Cloudflare `vars` / `.env.local`. Web3Forms’ docs use this key directly
	 * in the browser; it’s public by design.
	 */
	accessKey: string;
};

export function ConnectForm({ accessKey }: ConnectFormProps) {
	const baseId = useId();
	const [error, setError] = useState<string | null>(null);
	const [state, setState] = useState<SubmitState>("idle");
	const [storageReady, setStorageReady] = useState(false);
	const [alreadySentFromStorage, setAlreadySentFromStorage] = useState(false);

	useEffect(() => {
		try {
			if (localStorage.getItem(STORAGE_KEY) === "1") {
				setAlreadySentFromStorage(true);
			}
		} catch {
			// private mode or storage disabled — allow form, cannot persist
		}
		setStorageReady(true);
	}, []);

	function persistOneSubmission() {
		try {
			localStorage.setItem(STORAGE_KEY, "1");
		} catch {
			// still show success; user could resubmit in another tab
		}
	}

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
		if (alreadySentFromStorage) {
			setError("You have already sent a message from this browser.");
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
		if (!accessKey) {
			setError(
				"Form is not configured yet. The site owner needs to set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in the environment and redeploy."
			);
			return;
		}

		const payload = new FormData();
		payload.append("access_key", accessKey);
		payload.append("subject", DEFAULT_SUBJECT);
		payload.append("name", `${first} ${last}`.trim());
		payload.append("email", email);
		payload.append("message", message || "(no message provided)");
		payload.append("firstName", first);
		payload.append("lastName", last);

		setState("sending");
		try {
			const res = await fetch(WEB3FORMS_URL, { method: "POST", body: payload });
			const raw = await res.text();
			let data: { success?: boolean; message?: string } = {};
			try {
				data = raw ? (JSON.parse(raw) as typeof data) : {};
			} catch {
				// leave data empty; handled below
			}
			if (res.ok && data.success) {
				persistOneSubmission();
				setAlreadySentFromStorage(true);
				setState("success");
				form.reset();
			} else {
				setState("idle");
				setError(data.message ?? `Submission failed (${res.status}). Please try again in a few minutes.`);
			}
		} catch (err) {
			setState("idle");
			const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
			const detail =
				err instanceof Error && err.name === "TypeError" ? " Your browser may have blocked the request." : "";
			setError(
				isOffline
					? "You appear to be offline. Reconnect and try again."
					: `We couldn't reach the email service.${detail} Please try again.`
			);
		}
	}

	const showThankYou = state === "success" || alreadySentFromStorage;
	const thankYouIsFresh = state === "success";

	if (!storageReady) {
		return (
			<p className="m-0 font-inter-tight text-sm text-zinc-500" aria-live="polite">
				Loading form…
			</p>
		);
	}

	if (showThankYou) {
		return (
			<div
				className="font-inter-tight w-full min-w-0 max-w-lg rounded-md border border-zinc-300 bg-zinc-50 px-4 py-6 sm:px-6"
				role="status"
			>
				<p className="m-0 text-base font-medium text-zinc-900 sm:text-lg">
					{thankYouIsFresh
						? "Thanks — we received your message."
						: "We already have your message from this browser."}
				</p>
				<p className="mt-2 m-0 text-sm leading-relaxed text-zinc-600">
					{thankYouIsFresh ? (
						"We&rsquo;ll be in touch at the email you provided."
					) : (
						<>
							Only one message is allowed per device to reduce spam. If you need to reach us again, email{" "}
							<a
								href="mailto:charlottemicrochurch@gmail.com"
								className="font-medium text-zinc-800 underline decoration-zinc-400 underline-offset-2 transition-colors hover:text-zinc-600"
							>
								charlottemicrochurch@gmail.com
							</a>
							.
						</>
					)}
				</p>
			</div>
		);
	}

	return (
		<form
			method="post"
			action={WEB3FORMS_URL}
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
