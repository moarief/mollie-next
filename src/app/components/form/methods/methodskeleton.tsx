import {
  Card,
  Flex,
  Separator,
  Text,
  RadioCards,
  Skeleton,
  Switch,
} from "@radix-ui/themes";
import React from "react";

// mock some methods
const methods = [
  {
    id: "ideal",
    description: "iDeal",
  },
  {
    id: "creditcard",
    description: "Credit Card",
  },
  {
    id: "paypal",
    description: "PayPal",
  },
  {
    id: "Billie",
    description: "Billie",
  },
  {
    id: "bancontact",
    description: "Bancontact",
  },
  {
    id: "giropay",
    description: "Giropay",
  },
  {
    id: "eps",
    description: "EPS",
  },
  {
    id: "kbc",
    description: "KBC/CBC",
  },
];

export default async function MethodsSkeleton() {
  return (
    <>
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
                <Skeleton width='32px' height='24px'></Skeleton>
                <Skeleton>
                  <Text>{method.description}</Text>
                </Skeleton>
              </RadioCards.Item>
            </React.Fragment>
          ))}
        </RadioCards.Root>
        <Separator my='3' size='4' />
        <Flex>
          <Text as='label' size='2'>
            <Flex gap='2' direction='column'>
              <Flex gap='2'>
                <Skeleton>
                  <Switch
                    radius='full'
                    name='captureMode'
                    value={"manual"}
                    aria-label='Capture mode'
                  />
                </Skeleton>
                <Skeleton>Authorize payment (Cards and Klarna only)</Skeleton>
              </Flex>
              <Skeleton>
                <Text size='1' color='gray'>
                  Authorized payments need to be captured later
                </Text>
              </Skeleton>
            </Flex>
          </Text>
        </Flex>
      </Card>
    </>
  );
}
