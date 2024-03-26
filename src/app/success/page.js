import { RocketIcon } from "@radix-ui/react-icons";
import { Callout, Flex, Heading } from "@radix-ui/themes";

export default function Page() {
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading>Success</Heading>
        <Flex align="center" justify="center" mt="4">
          <Callout.Root size="3" color="green">
            <Callout.Icon>
              <RocketIcon />
            </Callout.Icon>
            <Callout.Text>Your Order is authorized!</Callout.Text>
          </Callout.Root>
        </Flex>
      </Flex>
    </main>
  );
}
