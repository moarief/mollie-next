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
} from "@radix-ui/themes";

export default function Form() {
  const createOrder = async (formData: FormData) => {
    "use server";

    // hier Mondu Request

    revalidatePath("/orders");
  };

  return (
    <Flex direction="column" m="6">
      <Heading mb="4">Checkout</Heading>
      <Grid pt="2" columns="2" gap="3">
        <Flex direction="column" gap="2">
          <form action={createOrder}>
            <Grid columns="2" gap="3" width="auto">
              <Flex direction="column" gap="1">
                <Text>Firstname</Text>
                <TextFieldRoot mb="2">
                  <TextFieldInput placeholder="Firstname"></TextFieldInput>
                </TextFieldRoot>
              </Flex>
              <Flex direction="column" gap="1">
                <Text>Lastname</Text>
                <TextFieldRoot mb="2">
                  <TextFieldInput placeholder="Lastname"></TextFieldInput>
                </TextFieldRoot>
              </Flex>
            </Grid>
            <Flex direction="column" gap="1">
              <Text>Company Name</Text>
              <TextFieldRoot mb="2">
                <TextFieldInput placeholder="Company"></TextFieldInput>
              </TextFieldRoot>
            </Flex>
            <Tooltip content="choose your desired outcome">
              <Flex direction="column" gap="1">
                <Text>Email</Text>
                <SelectRoot defaultValue="accepted.mondu-next@example.com">
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
                <TextFieldInput placeholder="Somestreet 123"></TextFieldInput>
              </TextFieldRoot>
            </Flex>
            <Flex direction="column" gap="1">
              <Text>City</Text>
              <TextFieldRoot mb="2">
                <TextFieldInput placeholder="Berlin"></TextFieldInput>
              </TextFieldRoot>
            </Flex>
            <Grid columns="2" gap="3" width="auto">
              <Flex direction="column" gap="1">
                <Text>Zip</Text>
                <TextFieldRoot mb="2">
                  <TextFieldInput placeholder="10179"></TextFieldInput>
                </TextFieldRoot>
              </Flex>
              <Flex direction="column" gap="1">
                <Text>Country</Text>
                <SelectRoot defaultValue="DE">
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
            <Button> Submit </Button>
          </form>
        </Flex>
        <Flex direction="column"></Flex>
      </Grid>
    </Flex>
  );
}
