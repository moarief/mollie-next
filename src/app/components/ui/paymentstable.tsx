'use server';

// UI Components
import { Flex, Table, IconButton } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import StateBadge from './orderstatebadge';

// Routing
import Link from 'next/link';

// Mollie API
import { mollieGetPayments } from '@/app/lib/mollie';

export default async function PaymentsTable() {
    const payments = await mollieGetPayments();
    return (
        <Flex
            justify="center"
            pt="4"
        >
            <Flex>
                <Table.Root
                    variant="ghost"
                    size={{
                        initial: '1',
                        sm: '2',
                        lg: '3',
                    }}
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell align="center">
                                Payment ID
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell align="center">
                                Created At
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell align="center">
                                Status
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell align="center">
                                Details
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {payments.map((payment, index) => (
                            <Table.Row
                                key={index}
                                className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <Table.RowHeaderCell align="center">
                                    {payment.id}
                                </Table.RowHeaderCell>
                                <Table.Cell align="center">
                                    {new Date(payment.createdAt).toLocaleString(
                                        'de-DE',
                                        {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        }
                                    )}
                                </Table.Cell>
                                <Table.Cell align="center">
                                    <StateBadge state={payment.status} />
                                </Table.Cell>
                                <Table.Cell align="center">
                                    <IconButton variant="outline">
                                        <Link href={'/payments/' + payment.id}>
                                            <MagnifyingGlassIcon />
                                        </Link>
                                    </IconButton>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Flex>
        </Flex>
    );
}
