import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const payload = await request.text();
    return new Response("Webhook successfully received", {
      status: 200,
    });
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 403,
    });
  }
}
