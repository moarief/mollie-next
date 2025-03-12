import CheckoutForm from '../components/form/checkoutform';

// import form server components
// since the form itself must be a client component, we import the server components here
// and pass them as props to the form
import Address from '../components/form/address';
import HostedPaymentMethods from '../components/form/methods/hostedpaymentmethods';
import { Suspense } from 'react';

// invalidate page cache every 5 minutes to pick up new available payment methods
export const revalidate = 300;

export default async function Page(props: {
    searchParams?: Promise<{
        currency?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const currency = searchParams?.currency || 'EUR';

    return (
        <main>
            <CheckoutForm
                address={<Address />}
                hostedmethods={<HostedPaymentMethods currency={currency} />}
            />
        </main>
    );
}
