import { Flex, Heading } from "@radix-ui/themes";
import OrderTable from "@/app/components/ui/ordertable.jsx";
import Pagination from "../components/ui/pagination";


export default async function Page(
  props: {
    searchParams: Promise<{ page: number; per_page: number }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const per_page = Number(searchParams.per_page) || 10;
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
