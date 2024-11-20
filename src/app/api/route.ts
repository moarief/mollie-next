import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const payload = await request.text();
    revalidatePath("/orders/");
    return new Response("Webhook successfully received", {
      status: 200,
    });
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 403,
    });
  }
}
