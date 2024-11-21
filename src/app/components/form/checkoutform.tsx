// UI
import {
    Button,
    Flex,
    Grid,
    Heading,
    Text,
    TextField,
    Select,
    Separator,
    Switch,
    Card,
    RadioGroup,
    Table,
    Link,
    Callout,
} from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

// Next logic
import { redirect } from 'next/navigation';

// Lib
import { validateFormData, validateUrl } from '@/app/lib/validation';
import { mollieCreateOrder } from '@/app/lib/mollie';
import PaymentLogo from '@/app/components/form/paymentlogo';

export default async function CheckoutForm() {
    // This Server Action takes the form data, validates it and creates an order
    const createOrder = async (formData: FormData) => {
        'use server';

        const validatedForm: {
            firstname: string;
            lastname: string;
            company: string;
            email: string;
            address: string;
            city: string;
            zip_code: string;
            country: string;
            payment_method: string | undefined;
        } = await validateFormData(formData);

        const mollieRedirectUrl: string | null = await mollieCreateOrder(
            validatedForm
        );
        if (!mollieRedirectUrl) {
            throw new Error('Failed to create Mollie order');
        }
        const validatedRedirectUrl = await validateUrl(mollieRedirectUrl);
        // redirect to Mollie hosted checkout
        redirect(validatedRedirectUrl);
    };

    return (
        <form action={createOrder}>
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
                    <Flex
                        direction="column"
                        gap="2"
                    >
                        <Heading size="3">Billing Address</Heading>
                        <Grid
                            columns="2"
                            gap="3"
                            width="auto"
                        >
                            <Flex
                                direction="column"
                                gap="1"
                            >
                                <Text as="label">Firstname</Text>
                                <TextField.Root
                                    mb="2"
                                    placeholder="Firstname"
                                    defaultValue="Max"
                                    name="firstname"
                                    required
                                ></TextField.Root>
                            </Flex>
                            <Flex
                                direction="column"
                                gap="1"
                            >
                                <Text as="label">Lastname</Text>
                                <TextField.Root
                                    mb="2"
                                    placeholder="Lastname"
                                    defaultValue="Mustermensch"
                                    name="lastname"
                                    required
                                ></TextField.Root>
                            </Flex>
                        </Grid>
                        <Flex
                            direction="column"
                            gap="1"
                        >
                            <Text as="label">Company Name</Text>
                            <TextField.Root
                                mb="2"
                                placeholder="Company"
                                defaultValue="Mollie BV"
                                name="company"
                                required
                            ></TextField.Root>
                        </Flex>
                        <Flex
                            direction="column"
                            gap="1"
                        >
                            <Text as="label">Email</Text>
                            <TextField.Root
                                mb="2"
                                placeholder="test@example.com"
                                defaultValue="demo@example.com"
                                name="email"
                                required
                            ></TextField.Root>
                        </Flex>
                        <Flex
                            direction="column"
                            gap="1"
                        >
                            <Text as="label">Address</Text>
                            <TextField.Root
                                mb="2"
                                placeholder="Somestreet 123"
                                defaultValue="Alexanderstr. 36"
                                name="address"
                                required
                            ></TextField.Root>
                        </Flex>
                        <Flex
                            direction="column"
                            gap="1"
                        >
                            <Text as="label">City</Text>
                            <TextField.Root
                                mb="2"
                                placeholder="Berlin"
                                defaultValue="Berlin"
                                name="city"
                                required
                            ></TextField.Root>
                        </Flex>
                        <Grid
                            columns="2"
                            gap="3"
                            width="auto"
                        >
                            <Flex
                                direction="column"
                                gap="1"
                            >
                                <Text as="label">Zip</Text>
                                <TextField.Root
                                    mb="2"
                                    placeholder="10179"
                                    defaultValue="10179"
                                    name="zip_code"
                                    required
                                ></TextField.Root>
                            </Flex>
                            <Flex
                                direction="column"
                                gap="1"
                            >
                                <Text as="label">Country</Text>
                                <Select.Root
                                    defaultValue="DE"
                                    name="country"
                                    required
                                >
                                    <Select.Trigger />
                                    <Select.Content>
                                        <Select.Item value="DE">
                                            Germany
                                        </Select.Item>
                                        <Select.Item value="AT">
                                            Austria
                                        </Select.Item>
                                        <Select.Item value="NL">
                                            Netherlands
                                        </Select.Item>
                                        <Select.Item value="UK">
                                            United Kingdom
                                        </Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Flex>
                        </Grid>
                        <Separator
                            my="3"
                            size="4"
                        />
                        <Heading
                            size="3"
                            mb="4"
                        >
                            Shipping Address
                        </Heading>
                        <Flex>
                            <Text
                                as="label"
                                size="2"
                            >
                                <Flex gap="2">
                                    <Switch
                                        defaultChecked
                                        radius="full"
                                    />{' '}
                                    Shipping address is the same as my billing
                                    address
                                </Flex>
                            </Text>
                        </Flex>
                        <Separator
                            my="3"
                            size="4"
                        />
                    </Flex>
                    <Flex
                        direction="column"
                        gap="2"
                    >
                        <Heading size="3">Your Shopping Cart</Heading>
                        <Card m="1">
                            <Flex direction="column">
                                <Table.Root>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell>
                                                Product
                                            </Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>
                                                Quantity
                                            </Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>
                                                Price
                                            </Table.ColumnHeaderCell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Flex direction="column">
                                                    <Text>Product 1</Text>
                                                    <Text
                                                        size="1"
                                                        color="gray"
                                                    >
                                                        Description
                                                    </Text>
                                                </Flex>
                                            </Table.Cell>
                                            <Table.Cell>1</Table.Cell>
                                            <Table.Cell>200,00 €</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Flex direction="column">
                                                    <Text>Product 2</Text>
                                                    <Text
                                                        size="1"
                                                        color="gray"
                                                    >
                                                        Description
                                                    </Text>
                                                </Flex>
                                            </Table.Cell>
                                            <Table.Cell>1</Table.Cell>
                                            <Table.Cell>10,00 €</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Flex direction="column">
                                                    <Text>Product 3</Text>
                                                    <Text
                                                        size="1"
                                                        color="gray"
                                                    >
                                                        Description
                                                    </Text>
                                                </Flex>
                                            </Table.Cell>
                                            <Table.Cell>1</Table.Cell>
                                            <Table.Cell>10,00 €</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table.Root>
                                <Flex
                                    align="center"
                                    justify="center"
                                    gap="2"
                                    m="3"
                                >
                                    <Heading size="2">Total</Heading>
                                    <Heading size="2">220,00 €</Heading>
                                </Flex>
                            </Flex>
                        </Card>
                        <Heading
                            size="3"
                            mt="2"
                        >
                            Payment
                        </Heading>
                        <RadioGroup.Root
                            defaultValue="creditcard"
                            name="payment_method"
                        >
                            <Card m="1">
                                <Flex direction="column">
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
                                                <RadioGroup.Item value="creditcard" />
                                                Credit Card
                                            </Flex>
                                        </Text>
                                        <PaymentLogo method="creditcard" />
                                    </Flex>
                                    <Separator
                                        my="3"
                                        size="4"
                                    />
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
                                                <RadioGroup.Item value="directdebit" />
                                                SEPA Direct Debit
                                            </Flex>
                                        </Text>
                                        <PaymentLogo method="directdebit" />
                                    </Flex>
                                    <Separator
                                        my="3"
                                        size="4"
                                    />
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
                                                <RadioGroup.Item value="ideal" />
                                                iDeal
                                            </Flex>
                                        </Text>
                                        <PaymentLogo method="ideal" />
                                    </Flex>
                                    <Separator
                                        my="3"
                                        size="4"
                                    />
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
                                                <RadioGroup.Item value="bancontact" />
                                                Bancontact
                                            </Flex>
                                        </Text>
                                        <PaymentLogo method="bancontact" />
                                    </Flex>
                                    <Separator
                                        my="3"
                                        size="4"
                                    />
                                    <Callout.Root>
                                        <Callout.Icon>
                                            <InfoCircledIcon />
                                        </Callout.Icon>
                                        <Callout.Text>
                                            Test Mode only!
                                        </Callout.Text>
                                    </Callout.Root>
                                </Flex>
                            </Card>
                        </RadioGroup.Root>
                    </Flex>
                </Grid>
                <Flex
                    align="center"
                    justify="center"
                    mt="6"
                >
                    <Button
                        variant="solid"
                        size="3"
                        className="w-8/12 sm:w-6/12 lg:w-4/12"
                    >
                        Buy Now (Hosted Checkout)
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
}
