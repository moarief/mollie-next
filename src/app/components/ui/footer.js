import { Text, Flex } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Flex direction="column" align="center">
      <Text size="3" color="gray">
        © 2024 Mondu GmbH
      </Text>
      <Text size="1" color="gray">
        This site is not part of Mondus official product offering. Use at your
        own risk.
      </Text>
    </Flex>
  );
}
