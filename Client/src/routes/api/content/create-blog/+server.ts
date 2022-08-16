import type { RequestHandler } from "./$types";
import type { Blog, BlogForm } from "$lib/models/content";
import cookie from "cookie";
import { postReq } from "$lib/http";

export const POST: RequestHandler = async ({ request, url }) => {
	const profileId = url.searchParams.get('profileId');
	const formInfo: BlogForm = await request.json();
	const cookies = cookie.parse(request.headers.get('cookie') || '');

	if (!profileId) {
		return new Response(null, { status: 500 });
	} else {
		const response = await postReq<Blog>('/blogs/create-blog', formInfo, {
			headers: {
				'Authorization': `Bearer ${cookies["accessKey"]}`
			}
		});
		if (!(response as Blog).id) {
			console.log(response);
			return new Response(null, { status: 500 });
		} else {
			return new Response(JSON.stringify(response as Blog), {
				status: 200,
				headers: {
					'content-type': 'application/json',
				}
			});
		}
	}
}