import { headers } from "next/headers";
import MonduVerifier from "@/app/lib/webhookVerifier";

export async function POST(
  request: Request
): Promise<void | Response | Promise<void | Response>> {
  try {
    const headersList = headers();
    const payload = await request.text();
    const signature = headersList.get("X-Mondu-Signature");
    const isVerified = MonduVerifier(payload, signature || ""); // Handle null case

    if (!isVerified) {
      throw new Error("Webhook verification failed");
    }

    // Process the webhook payload
    return new Response("Success! " + payload, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 403,
    });
  }
}
