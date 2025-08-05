// import form server components
// since the form itself must be a client component, we import the server components here
// and pass them as props to the form
import CheckoutForm from "../components/form/checkoutform";
import Address from "../components/form/address";
import HostedPaymentMethods from "../components/form/methods/hostedpaymentmethods";
import MethodsSkeleton from "../components/form/methods/methodskeleton";

// React components
import { Suspense } from "react";

// Validation for Currency Strings
import { validateCurrency, validateCountry } from "../lib/validation";
import { Shipping } from "../components/form/shipping";

// invalidate page cache every 5 minutes to pick up new available payment methods
export const revalidate = 300;

export default async function Page(props: {
  searchParams?: Promise<{
    currency?: string;
    country?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currency = searchParams?.currency || "EUR";
  const country = searchParams?.country || "DE";
  // Validate the currency
  const validatedCurrency = await validateCurrency(currency);
  const validatedCountry = await validateCountry(country);

  return (
    <main>
      <CheckoutForm
        address={<Address />}
        shipping={<Shipping />}
        hostedmethods={
          <Suspense
            // use the validated currency as key to re-trigger suspense when currency changes
            key={`${validatedCurrency}-${validatedCountry}`}
            fallback={<MethodsSkeleton />}
          >
            <HostedPaymentMethods
              currency={validatedCurrency}
              country={validatedCountry}
            />
          </Suspense>
        }
      />
    </main>
  );
}
