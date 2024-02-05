"use server";

import {
  Text,
  TableRoot,
  TabsContent,
  TableRowHeaderCell,
  TableRow,
  TableCell,
} from "@radix-ui/themes";
import { Key } from "react";
import StateBadge from "../ui/orderStateBadge";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function WebhooksTab(order: { uuid: string }) {
  const entryList = await prisma.webhooks.findMany({
    where: {
      order_uuid: order.uuid,
    },
  });

  return (
    <TabsContent value="webhooks">
      <TableRoot variant="ghost">
        {entryList.map((entry) => (
          <TableRow key={entry.id as Key}>
            <TableRowHeaderCell>
              <Text mr="4">
                {new Date(entry.event_time).toLocaleString("de-DE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Text>
            </TableRowHeaderCell>
            <TableCell>
              <StateBadge state={entry.order_state} />
            </TableCell>
            <TableCell>
              <Text>{entry.topic}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableRoot>
    </TabsContent>
  );
}
