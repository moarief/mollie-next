'use server';

// UI Components

import { Flex, Code, Card, DataList, Button } from '@radix-ui/themes';
import StateBadge from './orderstatebadge';

// Routing
import Link from 'next/link';

// Mollie API
import { mollieGetPayment } from '@/app/lib/mollie';
import { Payment } from '@mollie/api-client';

export default async function PaymentOverview({ id }: { id: string }) {
    const payment: Payment = await mollieGetPayment(id);
    return (
        <Flex
            justify="center"
            pt="4"
        >
            <Flex>
                <Card>
                    <DataList.Root>
                        <DataList.Item align="center">
                            <DataList.Label>ID</DataList.Label>
                            <DataList.Value>
                                <Code variant="ghost">{payment.id}</Code>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Created At</DataList.Label>
                            <DataList.Value>
                                {new Date(payment.createdAt).toLocaleString(
                                    'de-DE',
                                    {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    }
                                )}
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>amount</DataList.Label>
                            <DataList.Value>
                                {payment.amount.value} {payment.amount.currency}
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Description</DataList.Label>
                            <DataList.Value>
                                {payment.description}
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Status</DataList.Label>
                            <DataList.Value>
                                <StateBadge state={payment.status} />
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item align="center">
                            <DataList.Label>Payment Method</DataList.Label>
                            <DataList.Value>
                                <Code variant="ghost">{payment.method}</Code>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item align="center">
                            <DataList.Label>Dashboard</DataList.Label>
                            <DataList.Value>
                                <Link
                                    href={
                                        'https://my.mollie.com/dashboard/org_19122057/payments/' +
                                        payment.id
                                    }
                                >
                                    <Button
                                        size="1"
                                        variant="soft"
                                    >
                                        Link
                                    </Button>
                                </Link>
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Card>
            </Flex>
        </Flex>
    );
}
