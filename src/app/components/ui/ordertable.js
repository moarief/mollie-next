"use server";

import {
  Flex,
  Badge,
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeaderCell,
  TableCell,
  TableBody,
  TableRowHeaderCell,
} from "@radix-ui/themes";
import { monduOrders } from "@/app/lib/mondu";
import Link from "next/link";

export default async function Ordertable() {
  const orders = await monduOrders();
  return (
    <Flex justify="center" pt="4">
      <Flex>
        <TableRoot variant="surface">
          <TableHeader>
            <TableRow>
              <TableColumnHeaderCell>UUID</TableColumnHeaderCell>
              <TableColumnHeaderCell>Order ID</TableColumnHeaderCell>
              <TableColumnHeaderCell>State</TableColumnHeaderCell>
              <TableColumnHeaderCell>Buyer</TableColumnHeaderCell>
              <TableColumnHeaderCell>Created At</TableColumnHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.values(orders).map((order, index) => (
              <TableRow key={index}>
                <>
                  <TableRowHeaderCell>
                    <Link href={"/orders/" + order.uuid}>{order.uuid}</Link>
                  </TableRowHeaderCell>
                </>
                <TableCell>{order.external_reference_id}</TableCell>
                <TableCell>
                  <Badge
                    color={
                      order.state === "data_required"
                        ? "gray"
                        : order.state === "created"
                        ? "amber"
                        : order.state === "authorized"
                        ? "green"
                        : order.state === "shipped"
                        ? "green"
                        : order.state === "canceled"
                        ? "red"
                        : "gray"
                    }
                  >
                    {order.state}
                  </Badge>
                </TableCell>
                <TableCell>{order.buyer_name}</TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Flex>
    </Flex>
  );
}
