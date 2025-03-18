'use client';

import { Flex } from '@radix-ui/themes';
import { useEffect, use } from 'react';

import { createSessionPayment } from '@/app/lib/server-actions';

export default function SessionWrapper({ session }) {
    // Check if the Mollie object is available
    useEffect(() => {
        // Initialize the Mollie component
        console.log('Initializing Mollie component');
        const mollie = Mollie(session.clientAccessToken, { locale: 'en-US' });
        console.log('Mollie object:', mollie);

        const expressComponent = mollie.create('express-checkout');
        console.log('Express Component:', expressComponent);
        expressComponent.mount(document.getElementById('express-component'));

        // on the 'paymentauthorized' event, redirect to the success URL
        expressComponent.on('paymentauthorized', async (data) => {
            console.log('Payment authorized:', data);
            try {
                await createSessionPayment(session.id);
            } catch (error) {
                // Handle error if needed
            }
        });

        return () => {
            // Cleanup the Mollie component
            expressComponent.unmount();
        };
    }, [session.clientAccessToken]);

    return (
        <>
            <Flex
                align="center"
                justify="center"
                mt="4"
            >
                <Flex id="express-component"></Flex>
            </Flex>
        </>
    );
}
