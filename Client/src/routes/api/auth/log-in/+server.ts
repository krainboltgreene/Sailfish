import type { RequestHandler } from "./$types";
import type { ResponseError } from "$lib/http";
import { postReq } from "$lib/http";
import type { ClientPackage } from "$lib/models/accounts";
import type { LoginForm } from "$lib/models/accounts/forms";
import cookie from "cookie";

export const POST: RequestHandler = async ({ request }) => {
	const formInfo: LoginForm = await request.json();
	const response = await postReq<ClientPackage>('/auth/login', formInfo);

	if (!(response as ClientPackage).token) {
		return new Response(JSON.stringify(response as ResponseError), { status: 422 });
	} else if (response === undefined) {
		return new Response(null, { status: 500 });
	} else {
		const accessKey = cookie.serialize('accessKey', (response as ClientPackage).token, {
			path: '/',
			httpOnly: true,
			expires: new Date(Date.now() + 2592000)
		});

		return new Response(JSON.stringify(response as ClientPackage), {
			status: 200,
			headers: {
				'content-type': 'application/json',
				'set-cookie': accessKey,
			}
		});
	}
}
