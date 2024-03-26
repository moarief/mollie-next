import { monduOrder } from "@/app/lib/mondu";
import { Flex, Box, Card, Heading, Tabs } from "@radix-ui/themes";
import OrderOverview from "@/app/components/tabs/overview";
import OrderInvoices from "@/app/components/tabs/invoices";
import OrderStates from "@/app/components/tabs/states";
import WebhooksTab from "@/app/components/tabs/webhooks";
import { revalidatePath } from "next/cache";
import { validateUuid } from "@/app/lib/validation";

export default async function Page({ params }: { params: { id: string } }) {
  const validatedUuid = await validateUuid(params.id);
  const order = await monduOrder(validatedUuid);
  revalidatePath(`/orders/${validatedUuid}`);
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
                <Tabs.Trigger value="invoices">Invoices</Tabs.Trigger>
                <Tabs.Trigger value="states">Order States</Tabs.Trigger>
                <Tabs.Trigger value="webhooks">Webhooks</Tabs.Trigger>
              </Tabs.List>

              <Box px="4" pt="3" pb="2">
                <OrderOverview {...order} />
                <OrderInvoices {...order} />
                <OrderStates {...order} />
                <WebhooksTab {...order} />
              </Box>
            </Tabs.Root>
          </Card>
        </Flex>
      </Flex>
    </main>
  );
}
