import { revalidatePath } from "next/cache";
import {
  Button,
  Flex,
  Grid,
  Heading,
  TextFieldRoot,
  TextFieldInput,
} from "@radix-ui/themes";

export default function Form() {
  const createOrder = async (formData: FormData) => {
    "use server";

    // hier Mondu Request

    revalidatePath("/orders");
  };

  return (
    <Flex direction="column">
      <Heading>Checkout</Heading>
      <Grid pt="2" columns="2" gap="3">
        <Flex direction="column" gap="2">
          <form action={createOrder}>
            <TextFieldRoot mb="2">
              <TextFieldInput placeholder="Firstname"></TextFieldInput>
            </TextFieldRoot>
            <TextFieldRoot mb="2">
              <TextFieldInput placeholder="Lastname"></TextFieldInput>
            </TextFieldRoot>

            <Button> Submit </Button>
          </form>
        </Flex>
        <Flex direction="column"></Flex>
      </Grid>
    </Flex>
  );
}
