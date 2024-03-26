import {
  Text,
  Badge,
  Tabs,
  Flex,
  Separator,
  Dialog,
  Button,
  ScrollArea,
} from "@radix-ui/themes";
import StateBadge from "../ui/orderStateBadge";

export default function OrderOverview(order: {
  external_reference_id: string;
  buyer_name: string;
  state: string;
  payment_method: string;
  real_price_cents: number;
}) {
  return (
    <Tabs.Content value="overview">
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
          <StateBadge state={order.state} />
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
      <Separator my="3" size="4" />
      <Flex justify="end">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="outline">Show Raw Order Data</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Raw Order Data</Dialog.Title>
            <Separator my="2" size="4" />
            <ScrollArea style={{ height: 480 }}>
              <Text size="1">
                <pre>{JSON.stringify(order, null, 2)}</pre>
              </Text>
            </ScrollArea>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Tabs.Content>
  );
}
