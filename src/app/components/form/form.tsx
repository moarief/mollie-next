import { revalidatePath } from "next/cache";
import {
  Button,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  TextFieldRoot,
  TextFieldInput,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Tooltip,
  Separator,
  Switch,
  Card,
  RadioGroupRoot,
  RadioGroupItem,
  TableRoot,
  TableBody,
  TableRow,
  TableCell,
  TableColumnHeaderCell,
  Link,
  CalloutRoot,
  CalloutIcon,
  CalloutText,
} from "@radix-ui/themes";
import MonduLogo from "@/app/components/ui/monduLogo.js";
import { redirect } from "next/navigation";
import { monduCreateOrder } from "@/app/lib/mondu";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default async function Form() {
  const createOrder = async (formData: FormData) => {
    "use server";

    console.log("Form submitted", formData);
    // TODO: get values from form and submit to Mondu API
    // await monduCreateOrder();
    revalidatePath("/orders");

    // redirect to Mondu hosted checkout
    // redirect("");
  };

  return (
    <form action={createOrder}>
      <Flex direction="column" m="6">
        <Heading mb="4">Checkout</Heading>

        <Grid pt="2" columns="2" gap="5">
          <Flex direction="column" gap="2">
            <Heading size="3">Billing Address</Heading>

            <Grid columns="2" gap="3" width="auto">
              <Flex direction="column" gap="1">
                <Text>Firstname</Text>
                <TextFieldRoot mb="2">
                  <TextFieldInput
                    placeholder="Firstname"
                    defaultValue="Max"
                    name="firstname"
                  ></TextFieldInput>
                </TextFieldRoot>
              </Flex>
              <Flex direction="column" gap="1">
                <Text>Lastname</Text>
                <TextFieldRoot mb="2">
                  <TextFieldInput
                    placeholder="Lastname"
                    defaultValue="Mustermensch"
                    name="lastname"
                  ></TextFieldInput>
                </TextFieldRoot>
              </Flex>
            </Grid>
            <Flex direction="column" gap="1">
              <Text>Company Name</Text>
              <TextFieldRoot mb="2">
                <TextFieldInput
                  placeholder="Company"
                  defaultValue="Mondu GmbH"
                  name="company"
                ></TextFieldInput>
              </TextFieldRoot>
            </Flex>
            <Tooltip content="choose your desired outcome">
              <Flex direction="column" gap="1">
                <Text>Email</Text>
                <SelectRoot
                  defaultValue="accepted.mondu-next@example.com"
                  name="email"
                >
                  <SelectTrigger />
                  <SelectContent>
                    <SelectItem value="accepted.mondu-next@example.com">
                      Accepted
                    </SelectItem>
                    <SelectItem value="declined.mondu-next@example.com">
                      Declined
                    </SelectItem>
                    <SelectItem value="pending.mondu-next@example.com">
                      Pending
                    </SelectItem>
                  </SelectContent>
                </SelectRoot>
              </Flex>
            </Tooltip>
            <Flex direction="column" gap="1">
              <Text>Address</Text>
              <TextFieldRoot mb="2">
                <TextFieldInput
                  placeholder="Somestreet 123"
                  defaultValue="Alexanderstr. 36"
                  name="address"
                ></TextFieldInput>
              </TextFieldRoot>
            </Flex>
            <Flex direction="column" gap="1">
              <Text>City</Text>
              <TextFieldRoot mb="2">
                <TextFieldInput
                  placeholder="Berlin"
                  defaultValue="Berlin"
                  name="city"
                ></TextFieldInput>
              </TextFieldRoot>
            </Flex>
            <Grid columns="2" gap="3" width="auto">
              <Flex direction="column" gap="1">
                <Text>Zip</Text>
                <TextFieldRoot mb="2">
                  <TextFieldInput
                    placeholder="10179"
                    defaultValue="10179"
                    name="zip"
                  ></TextFieldInput>
                </TextFieldRoot>
              </Flex>
              <Flex direction="column" gap="1">
                <Text as="label">Country</Text>
                <SelectRoot defaultValue="DE" name="country">
                  <SelectTrigger />
                  <SelectContent>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="AT">Austria</SelectItem>
                    <SelectItem value="NL">Netherlands</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectContent>
                </SelectRoot>
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
            <Flex align="center" justify="center">
              <Button variant="classic" size="3" className="w-full">
                Buy Now
              </Button>
            </Flex>
          </Flex>
          <Flex direction="column" gap="2">
            <Heading size="3">Your Shopping Cart</Heading>
            <Card m="1">
              <Flex direction="column">
                <TableRoot>
                  <TableBody>
                    <TableRow>
                      <TableColumnHeaderCell>Product</TableColumnHeaderCell>
                      <TableColumnHeaderCell>Quantity</TableColumnHeaderCell>
                      <TableColumnHeaderCell>Price</TableColumnHeaderCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Flex direction="column">
                          <Text>Product 1</Text>
                          <Text size="1" color="gray">
                            Description
                          </Text>
                        </Flex>
                      </TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>200,00 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Flex direction="column">
                          <Text>Product 2</Text>
                          <Text size="1" color="gray">
                            Description
                          </Text>
                        </Flex>
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>10,00 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Flex direction="column">
                          <Text>Product 3</Text>
                          <Text size="1" color="gray">
                            Description
                          </Text>
                        </Flex>
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>10,00 €</TableCell>
                    </TableRow>
                  </TableBody>
                </TableRoot>
                <Flex direction="column" align="end" gap="2" mr="6" mt="2">
                  <Heading size="2">Total</Heading>
                  <Heading size="2">1020,00 €</Heading>
                </Flex>
              </Flex>
            </Card>
            <Heading size="3" mb="4" mt="2">
              Payment
            </Heading>
            <Card m="1">
              <Flex direction="column">
                <Flex align="center" gap="4">
                  <MonduLogo />
                  <Text>Invoice</Text>
                </Flex>
                <Separator my="3" size="4" />
                <Flex align="center" gap="4">
                  <MonduLogo />
                  <Text>SEPA Direct Debit</Text>
                </Flex>
                <Separator my="3" size="4" />
                <Flex align="center" gap="4">
                  <MonduLogo />
                  <Text>Installments</Text>
                </Flex>
                <Separator my="3" size="4" />
                <CalloutRoot>
                  <CalloutIcon>
                    <InfoCircledIcon />
                  </CalloutIcon>
                  <CalloutText>
                    Information on the processing of your personal data by Mondu
                    GmbH can be found{" "}
                    <Link href="https://www.mondu.ai/gdpr-notification-for-buyers/">
                      here
                    </Link>
                    .
                  </CalloutText>
                </CalloutRoot>
              </Flex>
            </Card>
          </Flex>
        </Grid>
      </Flex>
    </form>
  );
}
