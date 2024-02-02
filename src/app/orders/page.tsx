import { Flex, Heading } from "@radix-ui/themes";
import OrderTable from "@/app/components/ui/ordertable.js";
import { revalidatePath } from "next/cache";

export default function Page() {
  revalidatePath("/orders");
  return (
    <main>
      <Flex direction="column" gap="4">
        <Heading>Orders</Heading>
      </Flex>
      <OrderTable />
    </main>
  );
}
