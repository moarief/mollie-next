// See https://docs.mondu.ai/reference/webhook-security for more details
import crypto from "crypto";
import { monduWebhookSecret } from "./mondu";

export default async function MonduVerifier(payload: any, signature: string) {
  const secret = await monduWebhookSecret();
  const encodedPayload = payload;

  const signaturePayload = crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("hex");

  if (signaturePayload == signature) {
    return true;
  } else {
    return false;
  }
}
