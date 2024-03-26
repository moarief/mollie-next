"use server";

import { Flex, Table, IconButton } from "@radix-ui/themes";
import { monduOrders } from "@/app/lib/mondu";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import StateBadge from "./orderStateBadge";

export default async function Ordertable({ page, per_page }) {
  const orders = await monduOrders(page, per_page);
  return (
    <Flex justify="center" pt="4">
      <Flex>
        <Table.Root
          variant="ghost"
          size={{
            initial: "1",
            sm: "2",
            lg: "3",
          }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell align="center">
                Order ID
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center">
                Created At
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center">
                State
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center">
                Buyer
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell align="center">
                Details
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.values(orders).map((order, index) => (
              <Table.Row
                key={index}
                className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Table.RowHeaderCell align="center">
                  {order.external_reference_id}
                </Table.RowHeaderCell>
                <Table.Cell align="center">
                  {new Date(order.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Table.Cell>
                <Table.Cell align="center">
                  <StateBadge state={order.state} />
                </Table.Cell>
                <Table.Cell align="center">{order.buyer_name}</Table.Cell>

                <Table.Cell align="center">
                  <IconButton variant="outline">
                    <Link href={"/orders/" + order.uuid}>
                      <MagnifyingGlassIcon />
                    </Link>
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Flex>
  );
}
