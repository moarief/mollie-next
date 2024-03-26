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
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import MonduLogo from "@/app/components/ui/monduLogo.js";

// Next logic
import { redirect } from "next/navigation";

// Lib
import { validateFormData, validateUrl } from "@/app/lib/validation";
import { monduCreateOrder } from "@/app/lib/mondu";

export default async function CheckoutForm() {
  // This Server Action takes the form data, validates it and creates an order
  const createOrder = async (formData: FormData) => {
    "use server";

    const validatedForm = await validateFormData(formData);

    const monduRedirectUrl = await monduCreateOrder(validatedForm);
    const validatedRedirectUrl = await validateUrl(monduRedirectUrl);
    // redirect to Mondu hosted checkout
    redirect(validatedRedirectUrl);
  };

  return (
    <form action={createOrder}>
      <Flex direction="column" m="6">
        <Heading mb="4">Checkout</Heading>

        <Grid
          pt="2"
          columns={{
            initial: "1",
            md: "2",
          }}
          gap="5"
          gapY="6"
        >
          <Flex direction="column" gap="2">
            <Heading size="3">Billing Address</Heading>
            <Grid columns="2" gap="3" width="auto">
              <Flex direction="column" gap="1">
                <Text as="label">Firstname</Text>
                <TextField.Root
                  mb="2"
                  placeholder="Firstname"
                  defaultValue="Max"
                  name="firstname"
                  required
                ></TextField.Root>
              </Flex>
              <Flex direction="column" gap="1">
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
            <Flex direction="column" gap="1">
              <Text as="label">Company Name</Text>
              <TextField.Root
                mb="2"
                placeholder="Company"
                defaultValue="Mondu GmbH"
                name="company"
                required
              ></TextField.Root>
            </Flex>
            <Flex direction="column" gap="1">
              <Flex align="baseline" gap="2">
                <Text as="label">Email</Text>
                <Text size="1" color="gray">
                  (determines your desired order outcome)
                </Text>
              </Flex>
              <Select.Root
                defaultValue="accepted.mondu-next@example.com"
                name="email"
                required
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="accepted.mondu-next@example.com">
                    Accepted
                  </Select.Item>
                  <Select.Item value="declined.mondu-next@example.com">
                    Declined
                  </Select.Item>
                  <Select.Item value="pending.mondu-next@example.com">
                    Pending
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="label">Address</Text>
              <TextField.Root
                mb="2"
                placeholder="Somestreet 123"
                defaultValue="Alexanderstr. 36"
                name="address"
                required
              ></TextField.Root>
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="label">City</Text>
              <TextField.Root
                mb="2"
                placeholder="Berlin"
                defaultValue="Berlin"
                name="city"
                required
              ></TextField.Root>
            </Flex>
            <Grid columns="2" gap="3" width="auto">
              <Flex direction="column" gap="1">
                <Text as="label">Zip</Text>
                <TextField.Root
                  mb="2"
                  placeholder="10179"
                  defaultValue="10179"
                  name="zip_code"
                  required
                ></TextField.Root>
              </Flex>
              <Flex direction="column" gap="1">
                <Text as="label">Country</Text>
                <Select.Root defaultValue="DE" name="country" required>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="DE">Germany</Select.Item>
                    <Select.Item value="AT">Austria</Select.Item>
                    <Select.Item value="NL">Netherlands</Select.Item>
                    <Select.Item value="UK">United Kingdom</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Grid>
            <Separator my="3" size="4" />
            <Heading size="3" mb="4">
              Shipping Address
            </Heading>
            <Flex>
              <Text as="label" size="2">
                <Flex gap="2">
                  <Switch defaultChecked radius="full" /> Shipping address is
                  the same as my billing address
                </Flex>
              </Text>
            </Flex>
            <Separator my="3" size="4" />
          </Flex>
          <Flex direction="column" gap="2">
            <Heading size="3">Your Shopping Cart</Heading>
            <Card m="1">
              <Flex direction="column">
                <Table.Root>
                  <Table.Body>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Flex direction="column">
                          <Text>Product 1</Text>
                          <Text size="1" color="gray">
                            Description
                          </Text>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>5</Table.Cell>
                      <Table.Cell>200,00 €</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Flex direction="column">
                          <Text>Product 2</Text>
                          <Text size="1" color="gray">
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
                          <Text size="1" color="gray">
                            Description
                          </Text>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>1</Table.Cell>
                      <Table.Cell>10,00 €</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
                <Flex align="center" justify="center" gap="2" m="3">
                  <Heading size="2">Total</Heading>
                  <Heading size="2">1020,00 €</Heading>
                </Flex>
              </Flex>
            </Card>
            <Heading size="3" mt="2">
              Payment
            </Heading>
            <RadioGroup.Root defaultValue="invoice" name="payment_method">
              <Card m="1">
                <Flex direction="column">
                  <Flex align="center" justify="between" gap="4">
                    <Text as="label">
                      <Flex gap="2" align="center">
                        <RadioGroup.Item value="invoice" />
                        Invoice
                      </Flex>
                    </Text>
                    <MonduLogo />
                  </Flex>
                  <Separator my="3" size="4" />
                  <Flex align="center" justify="between" gap="4">
                    <Text as="label">
                      <Flex gap="2" align="center">
                        <RadioGroup.Item value="direct_debit" />
                        SEPA Direct Debit
                      </Flex>
                    </Text>
                    <MonduLogo />
                  </Flex>
                  <Separator my="3" size="4" />
                  <Flex align="center" justify="between" gap="4">
                    <Text as="label">
                      <Flex gap="2" align="center">
                        <RadioGroup.Item value="installment" />
                        Installments
                      </Flex>
                    </Text>
                    <MonduLogo />
                  </Flex>
                  <Separator my="3" size="4" />
                  <Flex align="center" justify="between" gap="4">
                    <Text as="label">
                      <Flex gap="2" align="center">
                        <RadioGroup.Item value="installment_by_invoice" />
                        Installments by invoice
                      </Flex>
                    </Text>
                    <MonduLogo />
                  </Flex>
                  <Separator my="3" size="4" />
                  <Callout.Root>
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      Information on the processing of your personal data by
                      Mondu GmbH can be found{" "}
                      <Link href="https://www.mondu.ai/gdpr-notification-for-buyers/">
                        here
                      </Link>
                      .
                    </Callout.Text>
                  </Callout.Root>
                </Flex>
              </Card>
            </RadioGroup.Root>
          </Flex>
        </Grid>
        <Flex align="center" justify="center" mt="6">
          <Button
            variant="solid"
            size="3"
            className="w-8/12 sm:w-6/12 lg:w-4/12"
          >
            Buy Now
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
