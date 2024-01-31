import { monduOrder } from "@/app/lib/mondu";
import {
  Flex,
  Box,
  Card,
  Text,
  Heading,
  Badge,
  ScrollArea,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Link,
} from "@radix-ui/themes";
import { Key } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const order = await monduOrder(params.id);

  return (
    <main>
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
              <TabsContent value="overview">
                <Flex direction="column" gap="3">
                  <Flex direction="row" justify="between">
                    <Text weight="bold">Reference ID</Text>
                    <Badge color="gray" ml="4">
                      {order.external_reference_id}
                    </Badge>
                  </Flex>
                  <Flex direction="row" justify="between">
                    <Text>Buyer Name</Text>
                    <Badge color="gray" ml="4">
                      {order.buyer_name}
                    </Badge>
                  </Flex>
                  <Flex direction="row" justify="between">
                    <Text>Order State</Text>
                    <Badge ml="4">{order.state}</Badge>
                  </Flex>
                  <Flex direction="row" justify="between">
                    <Text>Payment method</Text>
                    <Badge ml="4">{order.payment_method}</Badge>
                  </Flex>
                  <Flex direction="row" justify="between">
                    <Text>Order Amount</Text>
                    <Badge ml="4">
                      {(order.real_price_cents / 100).toLocaleString("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </Badge>
                  </Flex>
                </Flex>
              </TabsContent>
              <TabsContent value="webhooks">Coming Soon</TabsContent>
              <TabsContent value="full">
                <Flex>
                  <ScrollArea
                    type="always"
                    scrollbars="vertical"
                    style={{ height: 600 }}
                  >
                    <Text>
                      <pre>{JSON.stringify(order, null, 2)}</pre>
                    </Text>
                  </ScrollArea>
                </Flex>
              </TabsContent>
              <TabsContent value="invoices">
                <Flex>
                  <Flex direction="column" gap="2">
                    {order.invoices.map(
                      (invoice: {
                        uuid: Key | null | string;
                        created_at: string | number | Date;
                        gross_amount_cents: number;
                        invoice_url: string;
                      }) => (
                        <Flex
                          key={invoice.uuid}
                          direction="row"
                          justify="between"
                        >
                          <Flex>
                            <Text mr="4">
                              {new Date(invoice.created_at).toLocaleString(
                                "de-DE",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }
                              )}
                            </Text>
                            <Link href={invoice.invoice_url}>Invoice PDF</Link>
                            <Badge ml="4">
                              {(
                                invoice.gross_amount_cents / 100
                              ).toLocaleString("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </Badge>
                          </Flex>
                        </Flex>
                      )
                    )}
                  </Flex>
                </Flex>
              </TabsContent>
              <TabsContent value="states">
                <Flex>
                  <Flex direction="column" gap="2">
                    {order.state_histories.map(
                      (state_history: {
                        state: string;
                        created_at: string | number | Date;
                      }) => (
                        <Flex key={state_history.created_at as Key}>
                          <Flex direction="row" justify="between">
                            <Text mr="4">
                              {new Date(
                                state_history.created_at
                              ).toLocaleString("de-DE", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </Text>
                            <Badge>{state_history.state}</Badge>
                          </Flex>
                        </Flex>
                      )
                    )}
                  </Flex>
                </Flex>
              </TabsContent>
            </Box>
          </TabsRoot>
        </Card>
      </Flex>
    </main>
  );
}
