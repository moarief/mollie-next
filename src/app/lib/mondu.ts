"use server";

class MonduApi {
  apiUrl: string;
  apiKey: string;

  constructor() {
    this.apiUrl = "https://api.demo.mondu.ai/api/v1";
    this.apiKey = process.env.MONDU_API_KEY;
  }

  async createOrder({
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
    payment_method: string;
  }) {
    const response = await fetch(`${this.apiUrl}` + "/orders", {
      method: "POST",
      headers: {
        "Api-Token": this.apiKey,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currency: "EUR",
        billing_address: {
          country_code: country,
          city: city,
          zip_code: zip_code,
          address_line1: address,
        },
        shipping_address: {
          country_code: country,
          city: city,
          zip_code: zip_code,
          address_line1: address,
        },
        buyer: {
          is_registered: false,
          email: email,
          first_name: firstname,
          last_name: lastname,
          company_name: company,
        },
        lines: [
          {
            line_items: [
              {
                quantity: 5,
                external_reference_id: "1",
                title: "Product 1",
                net_price_per_item_cents: 20000,
                tax_cents: 3800,
              },
              {
                quantity: 1,
                external_reference_id: "2",
                title: "Product 2",
                net_price_per_item_cents: 1000,
                tax_cents: 190,
              },
              {
                quantity: 1,
                external_reference_id: "3",
                title: "Product 3",
                net_price_per_item_cents: 1000,
                tax_cents: 190,
              },
            ],
          },
        ],
        payment_method: payment_method,
        language: "en",
        // URLs to redirect to after hosted checkout
        success_url: "https://mondu-next.vercel.app/success",
        declined_url: "https://mondu-next.vercel.app/decline",
        cancel_url: "https://mondu-next.vercel.app/checkout",
        total_discount_cents: 0,
        external_reference_id: "mondu-next-ord-" + Date.now(), // fill external reference with a unique value. Can be changed later
        source: "widget",
        gross_amount_cents: 102000,
        state_flow: "authorization_flow",
      }),
    });

    if (!response.ok) {
      console.log("Mondu API Error: ", response.status);
      return { error: response.status };
    }

    const rawResponse = await response.json();
    console.log(rawResponse);
    const redirectURL = rawResponse.order.hosted_checkout_url;
    return redirectURL;
  }

  async getOrders(page: number, per_page: number) {
    const response = await fetch(
      `${this.apiUrl}/orders?page=${page}&per_page=${per_page}`,
      {
        headers: {
          "Api-Token": this.apiKey,
        },
      }
    );

    if (!response.ok) {
      console.log("Mondu API Error: ", response.status);
      return { error: response.status };
    }

    const rawResponse = await response.json();
    const orders = rawResponse.orders.map((order: any) => {
      const {
        uuid,
        state,
        real_price_cents,
        external_reference_id,
        buyer_name,
        created_at,
      } = order;
      return {
        uuid,
        state,
        real_price_cents,
        external_reference_id,
        buyer_name,
        created_at,
      };
    });
    return orders;
  }

  async getOrder(uuid: string) {
    const response = await fetch(`${this.apiUrl}` + "/orders/" + uuid, {
      headers: {
        "Api-Token": this.apiKey,
      },
    });

    if (!response.ok) {
      console.log("Mondu API Error: ", response.status);
      return { error: response.status };
    }
    const rawResponse = await response.json();
    const order = rawResponse.order;
    return order;
  }

  async confirmOrder(uuid: string, externalRefId?: string) {
    const response = await fetch(
      `${this.apiUrl}` + "/orders/" + uuid + "/confirm",
      {
        method: "POST",
        headers: {
          "Api-Token": this.apiKey,
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          external_reference_id: externalRefId,
        }),
      }
    );

    if (!response.ok) {
      console.log("Mondu API Error: ", response.status);
      return { error: response.status };
    } else {
      return { success: true };
    }
  }

  async getWebhookSecret() {
    const response = await fetch(`${this.apiUrl}` + "/webhooks/keys", {
      headers: {
        "Api-Token": this.apiKey,
      },
      next: { revalidate: 86400 }, // get webhook secret once a day
    });

    if (!response.ok) {
      console.log("Mondu API Error: ", response.status);
      return { error: response.status };
    }
    const rawResponse = await response.json();
    const secret = rawResponse.webhook_secret;
    return secret;
  }

  async healthCheck() {
    const response = await fetch("https://api.demo.mondu.ai/healthcheck", {
      next: { revalidate: 300 }, // get healthcheck every 5 minutes
    });
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  }
}

export async function monduOrders(page: number, per_page: number) {
  const monduApi = new MonduApi();
  const orders = await monduApi.getOrders(page, per_page);
  return orders;
}

export async function monduOrder(uuid: string) {
  const monduApi = new MonduApi();
  const order = await monduApi.getOrder(uuid);
  return order;
}

export async function monduCreateOrder(validatedForm: {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  address: string;
  city: string;
  zip_code: string;
  country: string;
  payment_method: string;
}) {
  const monduApi = new MonduApi();
  const redirectURL = await monduApi.createOrder(validatedForm);
  return redirectURL;
}

export async function monduConfirm(uuid: string, externalRefId?: string) {
  const monduApi = new MonduApi();
  const result = await monduApi.confirmOrder(uuid, externalRefId);
  return result;
}

export async function monduWebhookSecret() {
  const monduApi = new MonduApi();
  const secret = await monduApi.getWebhookSecret();
  return secret;
}

export async function isMonduUp() {
  const monduApi = new MonduApi();
  const result = await monduApi.healthCheck();
  return result;
}
