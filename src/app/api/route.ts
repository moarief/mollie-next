import { headers } from "next/headers";
import MonduVerifier from "@/app/lib/webhookVerifier";

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const payload = await request.text();
    const signature = headersList.get("X-Mondu-Signature");
    const isVerified = await MonduVerifier(payload, signature || ""); // Handle null case

    if (!isVerified) {
      throw new Error("Webhook verification failed");
    }

    // Process the webhook payload
    return new Response("Webhook successfully verified", {
      status: 200,
    });
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 403,
    });
  }
}
