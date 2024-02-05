import { monduOrder } from "@/app/lib/mondu";
import {
  Flex,
  Box,
  Card,
  Heading,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@radix-ui/themes";
import OrderOverview from "@/app/components/tabs/overview";
import OrderInvoices from "@/app/components/tabs/invoices";
import OrderStates from "@/app/components/tabs/states";
import OrderFull from "@/app/components/tabs/fullOrder";
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
          <Card variant="classic" style={{ width: 720 }}>
            <TabsRoot defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="states">Order States</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="full">Full Order Object</TabsTrigger>
              </TabsList>

              <Box px="4" pt="3" pb="2">
                <OrderOverview {...order} />
                <OrderInvoices {...order} />
                <OrderStates {...order} />
                <TabsContent value="webhooks">Coming Soon</TabsContent>
                <OrderFull {...order} />
              </Box>
            </TabsRoot>
          </Card>
        </Flex>
      </Flex>
    </main>
  );
}
