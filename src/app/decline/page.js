import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { Callout, Flex, Heading } from "@radix-ui/themes";

export default function Page() {
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading>Order Declined</Heading>
        <Flex align="center" justify="center" mt="4">
          <Callout.Root size="3" color="red">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>Your Order has been declined</Callout.Text>
          </Callout.Root>
        </Flex>
      </Flex>
    </main>
  );
}
