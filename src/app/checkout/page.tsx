// import form server components
// since the form itself must be a client component, we import the server components here
// and pass them as props to the form
import CheckoutForm from '../components/form/checkoutform';
import Address from '../components/form/address';
import HostedPaymentMethods from '../components/form/methods/hostedpaymentmethods';
import MethodsSkeleton from '../components/form/methods/methodskeleton';

// React components
import { Suspense } from 'react';

// Validation for Currency Strings
import { validateCurrency } from '../lib/validation';

// invalidate page cache every 5 minutes to pick up new available payment methods
export const revalidate = 300;

export default async function Page(props: {
    searchParams?: Promise<{
        currency?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const currency = searchParams?.currency || 'EUR';
    // Validate the currency
    const validatedCurrency = await validateCurrency(currency);

    return (
        <main>
            <CheckoutForm
                address={<Address />}
                hostedmethods={
                    <Suspense
                        // use the validated currency as key to re-trigger suspense when currency changes
                        key={validatedCurrency}
                        fallback={<MethodsSkeleton />}
                    >
                        <HostedPaymentMethods currency={validatedCurrency} />
                    </Suspense>
                }
            />
        </main>
    );
}
