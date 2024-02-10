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
  IconButton,
} from "@radix-ui/themes";
import { monduOrders } from "@/app/lib/mondu";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import StateBadge from "./orderStateBadge";

export default async function Ordertable({ page, per_page }) {
  const orders = await monduOrders(page, per_page);
  return (
    <Flex justify="center" pt="4">
      <Flex>
        <TableRoot variant="surface" size={{
          initial: "1",
          sm: "2",
          lg: "3" 
        }}>
          <TableHeader>
            <TableRow>
              <TableColumnHeaderCell align="center">Order ID</TableColumnHeaderCell>
              <TableColumnHeaderCell align="center">Created At</TableColumnHeaderCell>
              <TableColumnHeaderCell align="center">State</TableColumnHeaderCell>
              <TableColumnHeaderCell align="center">Buyer</TableColumnHeaderCell>
              
              <TableColumnHeaderCell align="center">Details</TableColumnHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.values(orders).map((order, index) => (
              <TableRow key={index}>
                  <TableRowHeaderCell align="center">
{order.external_reference_id}
                  </TableRowHeaderCell>
                                  <TableCell align="center">
                  {new Date(order.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell align="center">
                  <StateBadge state={order.state} />
                </TableCell>
                <TableCell align="center">{order.buyer_name}</TableCell>

                <TableCell align="center">
                  <IconButton variant="outline">
                    
                      <Link href={"/orders/" + order.uuid}><MagnifyingGlassIcon /></Link>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Flex>
    </Flex>
  );
}
