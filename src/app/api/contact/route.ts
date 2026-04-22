import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const DEFAULT_SUBJECT = "Connect with Us — Microchurch";

type Body = {
	firstName?: string;
	lastName?: string;
	email?: string;
	message?: string;
	botcheck?: string;
};

function envVar(env: object, k: string): string | undefined {
	return (env as Record<string, string | undefined>)[k];
}

/**
 * Resolves the Web3Forms access key at request time. On Cloudflare, Worker
 * `vars` from wrangler.jsonc are available via `getCloudflareContext().env` —
 * they are not always present in the client `NEXT_PUBLIC_*` build bundle.
 */
async function getWeb3AccessKey(): Promise<string | undefined> {
	const fromProcess =
		process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
		process.env.WEB3FORMS_ACCESS_KEY?.trim();
	if (fromProcess) return fromProcess;
	try {
		const { env } = await getCloudflareContext({ async: true });
		return (
			envVar(env, "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY")?.trim() ||
			envVar(env, "WEB3FORMS_ACCESS_KEY")?.trim()
		);
	} catch {
		return undefined;
	}
}

export async function POST(request: Request) {
	const accessKey = await getWeb3AccessKey();
	if (!accessKey) {
		return NextResponse.json(
			{ success: false, message: "Form is not configured on the server." },
			{ status: 503 }
		);
	}

	let body: Body;
	try {
		body = (await request.json()) as Body;
	} catch {
		return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
	}

	if (String(body.botcheck ?? "").trim() !== "") {
		return NextResponse.json({ success: false, message: "Unable to send your message." }, { status: 400 });
	}

	const first = String(body.firstName ?? "").trim();
	const last = String(body.lastName ?? "").trim();
	const email = String(body.email ?? "").trim();
	const message = String(body.message ?? "").trim();
	if (!first || !last || !email) {
		return NextResponse.json(
			{ success: false, message: "Please fill in your name and email." },
			{ status: 400 }
		);
	}

	const res = await fetch(WEB3FORMS_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify({
			access_key: accessKey,
			subject: DEFAULT_SUBJECT,
			name: `${first} ${last}`.trim(),
			email,
			message: message || "(no message provided)",
			firstName: first,
			lastName: last,
		}),
	});

	const data = (await res.json()) as { success?: boolean; message?: string; error?: string };
	if (res.ok && data.success) {
		return NextResponse.json({ success: true });
	}
	return NextResponse.json(
		{
			success: false,
			message: data.message ?? data.error ?? "Something went wrong. Please try again in a few minutes.",
		},
		{ status: res.ok ? 500 : res.status }
	);
}
