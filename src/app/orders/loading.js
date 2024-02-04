import { Flex, Card, Heading } from "@radix-ui/themes";

export default function Loading() {
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading>Orders</Heading>
        <Flex align="center" justify="center" pt="4">
          <Card>Loading...</Card>
        </Flex>
      </Flex>
    </main>
  );
}
