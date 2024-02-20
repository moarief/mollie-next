import {
  Flex,
  Box,
  Card,
  Heading,
  TabsRoot,
  TabsList,
  TabsTrigger,
} from "@radix-ui/themes";
import OrderOverview from "@/app/components/tabs/overview";

export interface Order {
  external_reference_id: string;
  buyer_name: string;
  state: string;
  payment_method: string;
  real_price_cents: number;
}

export default async function Page() {
  // mock data for suspense
  const order = {
    external_reference_id: "Loading...",
    buyer_name: "Loading...",
    state: "Loading...",
    payment_method: "Loading...",
    real_price_cents: 0,
  };
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading mb="4">Order Overview</Heading>
        <Flex justify="center" p="2">
          <Card
            variant="classic"
            style={{ maxWidth: 720 }}
            size={{
              initial: "1",
              sm: "2",
              lg: "3",
            }}
          >
            <TabsRoot defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="states">Order States</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>

              <Box px="4" pt="3" pb="2">
                <OrderOverview {...order} />
              </Box>
            </TabsRoot>
          </Card>
        </Flex>
      </Flex>
    </main>
  );
}
