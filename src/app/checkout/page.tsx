import CheckoutForm from '../components/form/checkoutform';

// invalidate page cache every 5 minutes to pick up new available payment methods
export const revalidate = 300;

export default function Page() {
    return (
        <main>
            <CheckoutForm />
        </main>
    );
}
