import { Text, Flex } from "@radix-ui/themes";
import MonduStatus from "./monduStatus";

export default function Footer() {
  return (
    <Flex direction="column" align="center" gap="2">
      <Text
        size={{
          initial: "1",
          xs: "2",
          md: "3",
          xl: "4",
        }}
        color="gray"
      >
        © 2024 Mondu GmbH
      </Text>
      <Text size="1" color="gray">
        This site is not part of Mondus official product offering. Use at your
        own risk.
      </Text>
      <MonduStatus />
    </Flex>
  );
}
