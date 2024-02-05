import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import {
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
} from "@radix-ui/themes";

export default function Page() {
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading>Order Declined</Heading>
        <Flex align="center" justify="center" mt="4">
          <CalloutRoot size="3" color="red">
            <CalloutIcon>
              <ExclamationTriangleIcon />
            </CalloutIcon>
            <CalloutText>Your Order has been declined</CalloutText>
          </CalloutRoot>
        </Flex>
      </Flex>
    </main>
  );
}
