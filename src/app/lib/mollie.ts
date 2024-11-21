"use server";

import createMollieClient, {Payment} from '@mollie/api-client';
const apiKey = process.env.MOLLIE_API_KEY;
const domain = process.env.DOMAIN;
const webhookUrl = process.env.WEBHOOK_URL;


if (!apiKey) {
  throw new Error('MOLLIE_API_KEY is not defined');
}

const mollieClient = createMollieClient({ apiKey: apiKey });
  
  // Forward the customer to payment.getCheckoutUrl().

export async function mollieCreateOrder(
    {
        firstname,
        lastname,
        company,
        email,
        address,
        city,
        zip_code,
        country,
        payment_method,
      }: {
        firstname: string;
        lastname: string;
        company: string;
        email: string;
        address: string;
        city: string;
        zip_code: string;
        country: string;
        payment_method: string | undefined;
      }
) {
    const payment: Payment = await mollieClient.payments.create({
        "amount": {
            "currency": "EUR",
            "value": "220.00"
        },
        "description": "Demo payment from " + firstname,
        "redirectUrl": domain + "\/success",
        "cancelUrl": domain,
        "webhookUrl": webhookUrl,
        "method": payment_method as undefined,
        "billingAddress": {
            "givenName": firstname,
            "familyName": lastname,
            "organizationName": company,
            "streetAndNumber": address,
            "postalCode": zip_code,
            "city": city,
            "country": country,
            "email": email
        }
    });
    console.log(domain);
    const redirectUrl = payment.getCheckoutUrl();
    // console.log(payment);
    return redirectUrl;
  }