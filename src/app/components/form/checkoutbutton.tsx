'use client';

import { Button } from '@radix-ui/themes';
import { useFormStatus } from 'react-dom';
import { checkoutVariant } from '@/app/lib/validation';
import { useMollie } from '@/app/lib/MollieContext';
import { createPayment } from '@/app/lib/server-actions';

export default function CheckoutButton({
    variant,
}: {
    variant: checkoutVariant;
}) {
    // display a loading indicator once the button is clicked
    const { pending } = useFormStatus();

    // handle form submission when the card component is used
    // here we have to first get the card token from mollie
    // then we have to append the token to the form and submit it to the createPayment function

    const { mollie } = useMollie();
    const payWithToken = async () => {
        const formElement = document.querySelector('form');
        if (!formElement) {
            console.error('Form element not found');
            return;
        }
        const formData = new FormData(formElement);
        const { token, error } = await mollie.createToken();
        if (error) {
            console.error('Error creating card token:', error);
            return;
        }
        formData.append('cardToken', token);
        createPayment(formData);
    };

    return (
        <Button
            variant="solid"
            size="3"
            className="w-8/12 sm:w-6/12 lg:w-4/12"
            loading={pending}
            formAction={variant === 'components' ? payWithToken : createPayment}
        >
            Buy Now ({variant})
        </Button>
    );
}
