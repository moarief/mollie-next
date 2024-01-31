import { Flex, Heading } from "@radix-ui/themes";
import Table from "@/app/components/ui/table.js";

export default function Page() {
  return (
    <main>
      <Flex direction="column" gap="4">
        <Heading>Orders</Heading>
      </Flex>
      <Table />
    </main>
  );
}
