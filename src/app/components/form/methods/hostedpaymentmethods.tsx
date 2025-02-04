import {
    Card,
    Flex,
    RadioGroup,
    Separator,
    Text,
    Callout,
    Switch,
} from '@radix-ui/themes';

import React from 'react';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import PaymentLogo from '@/app/components/form/paymentlogo';

import { mollieGetMethods } from '@/app/lib/mollie';

export default async function HostedPaymentMethods() {
    const methods = await mollieGetMethods();

    return (
        <>
            <RadioGroup.Root
                defaultValue={methods[0]?.id}
                name="payment_method"
            >
                <Card m="1">
                    <Flex direction="column">
                        {methods.map((method) => (
                            <React.Fragment key={method.id}>
                                <Flex
                                    align="center"
                                    justify="between"
                                    gap="4"
                                >
                                    <Text as="label">
                                        <Flex
                                            gap="2"
                                            align="center"
                                        >
                                            <RadioGroup.Item
                                                value={method.id}
                                                aria-label={method.description}
                                            />
                                            {method.description}
                                        </Flex>
                                    </Text>
                                    <PaymentLogo method={method.id} />
                                </Flex>
                                <Separator
                                    my="3"
                                    size="4"
                                />
                            </React.Fragment>
                        ))}

                        <Callout.Root>
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>Test Mode only!</Callout.Text>
                        </Callout.Root>
                        <Separator
                            my="3"
                            size="4"
                        />
                        <Flex>
                            <Text
                                as="label"
                                size="2"
                            >
                                <Flex
                                    gap="2"
                                    direction="column"
                                >
                                    <Flex gap="2">
                                        <Switch
                                            radius="full"
                                            name="captureMode"
                                            value={'manual'}
                                            aria-label="Capture mode"
                                        />
                                        Authorize payment (Cards and Klarna
                                        only)
                                    </Flex>
                                    <Text
                                        size="1"
                                        color="gray"
                                    >
                                        Authorized payments need to be captured
                                        later
                                    </Text>
                                </Flex>
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </RadioGroup.Root>
        </>
    );
}
