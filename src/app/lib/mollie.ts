'use server';

import createMollieClient, {
    CaptureMethod,
    Locale,
    Payment,
    PaymentMethod,
    SequenceType,
} from '@mollie/api-client';

const apiKey = process.env.MOLLIE_API_KEY;
const domain = process.env.DOMAIN || 'http://localhost:3000';
const webhookUrl = process.env.WEBHOOK_URL || 'http://not.provided';

if (!apiKey) {
    throw new Error('MOLLIE_API_KEY is not defined');
}

// Set up Mollie API client
const mollieClient = createMollieClient({ apiKey: apiKey });

// Create a payment using data gathered from the checkout form
export async function mollieCreatePayment({
    firstname,
    lastname,
    company,
    email,
    address,
    city,
    zip_code,
    country,
    payment_method,
    cardToken,
    captureMode,
}: {
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    address: string;
    city: string;
    zip_code: string;
    country: string;
    payment_method: PaymentMethod;
    cardToken?: string;
    captureMode?: CaptureMethod;
}) {
    // we need to construct the billingAdress object first as long as this isn't fixed:
    // https://github.com/mollie/mollie-api-node/issues/390#issuecomment-2467604847
    const billingAddress = {
        givenName: firstname,
        familyName: lastname,
        organizationName: company,
        streetAndNumber: address,
        postalCode: zip_code,
        city: city,
        country: country,
        email: email,
    };

    // Likewise, we need to construct the lines object
    const lines = [
        {
            description: 'An expensive product',
            quantity: 1,
            unitPrice: {
                currency: 'EUR',
                value: '200.00',
            },
            totalAmount: {
                currency: 'EUR',
                value: '200.00',
            },
        },
        {
            description: 'A cheap product',
            quantity: 1,
            unitPrice: {
                currency: 'EUR',
                value: '10.00',
            },
            totalAmount: {
                currency: 'EUR',
                value: '10.00',
            },
        },
        {
            description: 'Another cheap product',
            quantity: 1,
            unitPrice: {
                currency: 'EUR',
                value: '10.00',
            },
            totalAmount: {
                currency: 'EUR',
                value: '10.00',
            },
        },
    ];

    // set up the actual payment with mollie library
    const payment: Payment = await mollieClient.payments.create({
        amount: {
            currency: 'EUR',
            value: '220.00',
        },
        metadata: {
            internal_payment_id: 'mollie-next-' + Date.now(),
        },
        ...{ lines },
        description: 'Demo payment from ' + firstname,
        redirectUrl: domain + '/success',
        cancelUrl: domain,
        webhookUrl: webhookUrl,
        method: payment_method,
        ...{ billingAddress },
        cardToken: cardToken,
        captureMode: captureMode as CaptureMethod,
    });
    const redirectUrl = payment.getCheckoutUrl();
    return redirectUrl;
}

// Get the last 10 payments made

export async function mollieGetPayments() {
    const payments = await mollieClient.payments.page({ limit: 10 });
    return payments;
}

// Get a specific payment by its ID

export async function mollieGetPayment(id: string) {
    const payment = await mollieClient.payments.get(id);
    return payment;
}

// Get the available payment methods in the checkout
// we're passing some additional info like sequencetype, locale and amount
// this way we can filter the available payment methods.

export async function mollieGetMethods() {
    const methods = await mollieClient.methods.list({
        sequenceType: SequenceType.oneoff,
        locale: Locale.en_US,
        resource: 'payments',
        amount: { currency: 'EUR', value: '220.00' },
    });
    return methods;
}

// Capture a payment in full

export async function mollieCapturePayment(id: string) {
    console.log('Capturing payment with id: ' + id);
    const capture = await mollieClient.paymentCaptures.create({
        paymentId: id,
    });
    return capture;
}
