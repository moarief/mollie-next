'use client';

import { Flex } from '@radix-ui/themes';
import { useEffect } from 'react';

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
