import { Flex, Box, Card, Heading, Tabs } from "@radix-ui/themes";
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
            <Tabs.Root defaultValue="overview">
              <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="webhooks">Webhooks</Tabs.Trigger>
              </Tabs.List>

              <Box px="4" pt="3" pb="2">
                <OrderOverview {...order} />
              </Box>
            </Tabs.Root>
          </Card>
        </Flex>
      </Flex>
    </main>
  );
}
