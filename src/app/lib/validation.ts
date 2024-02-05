"use server";

import { z } from "zod";

export default async function validateFormData(formData: FormData) {
  const form = Object.fromEntries(formData.entries());

  const formSchema = z.object({
    firstname: z
      .string()
      .min(1, { message: "Must be at least 1 cahracter long." }),
    lastname: z
      .string()
      .min(1, { message: "Must be at least 1 cahracter long." }),
    company: z
      .string()
      .min(1, { message: "Must be at least 1 cahracter long." }),
    email: z.string().email(),
    address: z
      .string()
      .min(1, { message: "Must be at least 1 cahracter long." }),
    city: z.string().min(1, { message: "Must be at least 1 cahracter long." }),
    zip_code: z
      .string()
      .min(1, { message: "Must be at least 1 cahracter long." }),
    country: z.string().length(2),
    payment_method: z.enum([
      "invoice",
      "direct_debit",
      "installment",
      "installment_by_invoice",
    ]),
  });

  const data = formSchema.parse(form);

  return data;
}

export async function validateUuid(uuid: string) {
  const uuidSchema = z.string().uuid();
  const data = uuidSchema.parse(uuid);
  return data;
}
