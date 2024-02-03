import { revalidatePath } from "next/cache";
import {
  Button,
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
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { monduCreateOrder } from "@/app/lib/mondu";

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
    <Flex direction="column" m="6">
      <Heading mb="4">Checkout</Heading>
      <Heading size="3">Billing Address</Heading>
      <Grid pt="2" columns="2" gap="3">
        <Flex direction="column" gap="2">
          <form action={createOrder}>
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
            <Heading size="3" mb="4">
              Payment
            </Heading>
            <RadioGroupRoot defaultValue="invoice" name="payment_method">
              <Flex gap="2" direction="column">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroupItem value="invoice" />
                    Invoice
                  </Flex>
                </Text>
              </Flex>
              <Flex gap="2" direction="column">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroupItem value="sepa" />
                    Sepa
                  </Flex>
                </Text>
              </Flex>
              <Flex gap="2" direction="column">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroupItem value="installments" />
                    Installments
                  </Flex>
                </Text>
              </Flex>
            </RadioGroupRoot>
            <Separator my="3" size="4" />
            <Flex justify="center" align="center">
              <Button variant="classic" size="4">
                Buy Now
              </Button>
            </Flex>
          </form>
        </Flex>
      </Grid>
    </Flex>
  );
}
