import { Text, Flex } from "@radix-ui/themes";

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
        © Hannes Reinberger
      </Text>
      <Text size="1" color="gray">
        This site is not part of Mollies official product offering. Use at your
        own risk.
      </Text>
    </Flex>
  );
}
