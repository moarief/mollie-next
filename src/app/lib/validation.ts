'use server';

import { z } from 'zod';

export async function validateFormData(formData: FormData) {
    const form = Object.fromEntries(formData.entries());

    const formSchema = z.object({
        firstname: z
            .string()
            .min(1, { message: 'Must be at least 1 character long.' }),
        lastname: z
            .string()
            .min(1, { message: 'Must be at least 1 character long.' }),
        company: z
            .string()
            .min(1, { message: 'Must be at least 1 character long.' }),
        email: z.string().email(),
        address: z
            .string()
            .min(1, { message: 'Must be at least 1 character long.' }),
        city: z
            .string()
            .min(1, { message: 'Must be at least 1 character long.' }),
        zip_code: z
            .string()
            .min(1, { message: 'Must be at least 1 character long.' }),
        country: z.string().length(2),
        payment_method: z.string(),
    });

    const data = formSchema.parse(form);

    return data;
}

export async function validateUrl(url: string) {
    const urlSchema = z.string().url();
    const data = urlSchema.parse(url);
    return data;
}
