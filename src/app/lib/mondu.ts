'use server';

class MonduApi {
  url: string;
  apiKey: string;

  constructor() {
    this.url = "https://api.demo.mondu.ai/api/v1/orders";
    this.apiKey = process.env.MONDU_API_KEY;
  }

  async createOrder() {
    const response = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Api-Token': this.apiKey,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
          gross_amount_cents: 102000,
          currency: "EUR"
          })
    });

    if (!response.ok) {
      console.log("Mondu API Error: ", response.status);
      return { error: response.status };
    }

    const rawResponse = await response.json();
    const redirectURL = rawResponse.order.hosted_checkout_url;
    return redirectURL;
  }
  
  async getOrders() {
    const response = await fetch(`${this.url}`+ "?page=1&per_page=20", {
      headers: {
        'Api-Token': this.apiKey
      },
      next: {revalidate: 60}
    });

    if (!response.ok) {
      console.log("Mondu API Error: ", response.status);
      return { error: response.status };
    }

    const rawResponse = await response.json();
    const orders = rawResponse.orders;
    return orders;
  }

  async getOrder(uuid: string) {
    const response = await fetch(`${this.url}` + "/" + uuid, {
      headers: {
        'Api-Token': this.apiKey
      }
    });

    if (!response.ok) {
    console.log("Mondu API Error: ", response.status);
    return { error: response.status }
  }
    const rawResponse = await response.json();
    const order = rawResponse.order;
    return order;
  }
}

export async function monduOrders() {
  const monduApi = new MonduApi();
  const orders = await monduApi.getOrders();
  return orders;
}

export async function monduOrder(uuid: string) {
  const monduApi = new MonduApi();
  const order = await monduApi.getOrder(uuid);
  return order;
}

export async function monduCreateOrder() {
  const monduApi = new MonduApi();
  const redirectURL = await monduApi.createOrder();
  return redirectURL;
}