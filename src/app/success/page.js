import { RocketIcon } from "@radix-ui/react-icons";
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
        <Heading>Success</Heading>
        <Flex align="center" justify="center" mt="4">
          <CalloutRoot size="3" color="green">
            <CalloutIcon>
              <RocketIcon />
            </CalloutIcon>
            <CalloutText>Your Order is authorized!</CalloutText>
          </CalloutRoot>
        </Flex>
      </Flex>
    </main>
  );
}
