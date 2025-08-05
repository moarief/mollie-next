import { getPickUpPoints } from "@/app/lib/shipmondo";
import {
  Card,
  Flex,
  Heading,
  RadioCards,
  Separator,
  Skeleton,
  Switch,
  Text,
} from "@radix-ui/themes";
import React from "react";

const methods = [
  {
    id: "gls",
    description: "GLS",
  },
  {
    id: "dao",
    description: "DAO",
  },
];

export const Shipping = async () => {
  // const shippingOptions = await getPickUpPoints();

  return (
    <Flex>
      <Heading size='3'>Shipping Options</Heading>
      <Text>Shipping options will be displayed here.</Text>

      <Card m='1'>
        <RadioCards.Root
          defaultValue={methods[0]?.id}
          name='payment_method'
          columns={{ initial: "1", sm: "2" }}
          size={{ initial: "1", sm: "2" }}
          mb='3'
        >
          {methods.map((method) => (
            <React.Fragment key={method.id}>
              <RadioCards.Item
                value={method.id}
                aria-label={method.description}
              >
                {/* <PaymentLogo method={method.id} /> */}
                <Text>{method.description}</Text>
              </RadioCards.Item>
            </React.Fragment>
          ))}
        </RadioCards.Root>
        <Separator my='3' size='4' />
      </Card>
    </Flex>
  );
};
