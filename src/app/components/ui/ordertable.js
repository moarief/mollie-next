"use server";

import {
  Flex,
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

import StateBadge from "./orderStateBadge";

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
                  <StateBadge state={order.state} />
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
