import { headers } from "next/headers";
import MonduVerifier from "@/app/lib/webhookVerifier";
import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const payload = await request.text();
    const signature = headersList.get("X-Mondu-Signature");
    const isVerified = await MonduVerifier(payload, signature || ""); // Handle null case

    if (!isVerified) {
      throw new Error("Webhook verification failed");
    }
    const webhookData = JSON.parse(payload);
    // destructure webhookData object into variables
    const {
      topic,
      order_uuid,
      order_state,
      event_time,
    }: {
      topic: string;
      order_uuid: string;
      order_state: string;
      event_time: Date;
    } = webhookData;

    const primsa = new PrismaClient();

    const webhook = await primsa.webhooks.create({
      data: {
        topic,
        order_uuid,
        order_state,
        event_time,
        payload,
      },
    });

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
