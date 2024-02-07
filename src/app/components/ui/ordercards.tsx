"use server";

import {
  Button,
  Flex,
  Heading,
  Card,
  Text,
  Grid,
  Separator,
  Badge,
} from "@radix-ui/themes";
import { monduOrders } from "@/app/lib/mondu";
import Link from "next/link";

import StateBadge from "./orderStateBadge";

export default async function Ordercards({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) {
  const orders: any[] = await monduOrders(page, per_page);
  return (
    <Flex justify="center" pt="4">
      <Grid
        columns={{
          initial: "1",
          md: "2",
          lg: "3",
        }}
        gap="5"
      >
        {orders.map((order) => (
          <Card key={order.uuid} size="1">
            <Flex gap="1" direction="column">
              <Flex gap="2" justify="between">
                <Text>Order ID</Text>
                <Badge color="gray">{order.external_reference_id}</Badge>
              </Flex>
              <Flex gap="2" justify="between">
                <Text>Created At</Text>
                <Badge color="gray">
                  {new Date(order.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Badge>
              </Flex>
              <Flex gap="2" justify="between">
                <Text>State</Text>
                <StateBadge state={order.state} />
              </Flex>
              <Flex gap="2" justify="between">
                <Text>Buyer</Text>
                <Badge color="gray">{order.buyer_name}</Badge>
              </Flex>
              <Flex gap="2" justify="between">
                <Text>Amount</Text>
                <Badge color="gray">
                  {(order.real_price_cents / 100).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Badge>
              </Flex>
            </Flex>
            <Separator m="3" size="4" />
            <Flex justify="end" mt="2" gap="3">
              <Button size="1" variant="outline" asChild>
                <Link href={`/orders/${order.uuid}`}>Order details</Link>
              </Button>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
}
