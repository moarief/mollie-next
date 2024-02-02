import { Flex } from "@radix-ui/themes";
import { Text, Badge, TabsContent } from "@radix-ui/themes";

export default function OrderOverview(order: {
  external_reference_id: string;
  buyer_name: string;
  state: string;
  payment_method: string;
  real_price_cents: number;
}) {
  return (
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
  );
}
