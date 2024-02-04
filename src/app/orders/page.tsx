import { Flex, Heading } from "@radix-ui/themes";
import OrderTable from "@/app/components/ui/ordertable.js";
import Pagination from "../components/ui/pagination";
import { revalidatePath } from "next/cache";

export default function Page({
  searchParams,
}: {
  searchParams: { page: number; per_page: number };
}) {
  const page = Number(searchParams.page) || 1;
  const per_page = Number(searchParams.per_page) || 10;
  revalidatePath("/orders");
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading>Orders</Heading>
        <OrderTable page={page} per_page={per_page} />
        <Pagination page={page} />
      </Flex>
    </main>
  );
}
