// UI
import { Flex, Grid, Heading } from '@radix-ui/themes';

// Next and React logic
import React from 'react';

// Lib
import { createPayment } from '@/app/lib/server-actions';

// Form components
import CheckoutButton from './checkoutbutton';
import HostedPaymentMethods from './methods/hostedpaymentmethods';
import MethodSwitch from './methods/switch';
import ShoppingCart from './shoppingcart';
import Address from './address';

export default async function CheckoutForm() {
    return (
        // The form data is sent to the createPayment function when the form is submitted
        <form action={createPayment}>
            <Flex
                direction="column"
                m="6"
            >
                <Heading mb="4">Checkout</Heading>

                <Grid
                    pt="2"
                    columns={{
                        initial: '1',
                        md: '2',
                    }}
                    gap="5"
                    gapY="6"
                >
                    <Address />
                    <Flex
                        direction="column"
                        gap="2"
                    >
                        <ShoppingCart />
                        <Heading
                            size="3"
                            mt="2"
                        >
                            Payment
                        </Heading>
                        <MethodSwitch prop={HostedPaymentMethods()} />
                    </Flex>
                </Grid>
                <Flex
                    align="center"
                    justify="center"
                    mt="6"
                >
                    <CheckoutButton />
                </Flex>
            </Flex>
        </form>
    );
}
