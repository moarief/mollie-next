"use client";

// UI
import { Flex, Grid, Heading } from "@radix-ui/themes";

// React Types
import React, { Suspense } from "react";

// Client Components
import CheckoutButton from "./checkoutbutton";
import ShoppingCart from "./shoppingcart";
import MethodsSkeleton from "./methods/methodskeleton";

// This is the main checkout form component

// It takes the address and payment methods as props
// The form itself is a client component (to make use of client-side JavaScript), but the address and payment methods are server components
// The form is submitted to the createPayment function when the CheckoutButton is clicked

export default function CheckoutForm({
  address,
  hostedmethods,
  shipping,
}: {
  address: React.ReactNode;
  hostedmethods: React.ReactNode;
  shipping?: React.ReactNode;
}) {
  return (
    // The form data is sent to the createPayment function when the form is submitted
    <form>
      <Flex direction='column' m='6'>
        <Heading mb='4'>Checkout</Heading>

        <Grid
          pt='2'
          columns={{
            initial: "1",
            md: "2",
          }}
          gap='5'
          gapY='6'
        >
          {address}
          {shipping}
          <Flex direction='column' gap='2'>
            <ShoppingCart />
            <Heading size='3' mt='2'>
              Payment
            </Heading>
            <Suspense fallback={MethodsSkeleton()}>{hostedmethods}</Suspense>
          </Flex>
        </Grid>
        <Flex align='center' justify='center' mt='6'>
          <CheckoutButton variant={"hosted"} />
        </Flex>
      </Flex>
    </form>
  );
}
