"use server";

import {
  Text,
  TableRoot,
  TabsContent,
  TableRowHeaderCell,
  TableRow,
  TableCell,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Button,
  DialogContent,
  ScrollArea,
  Separator,
} from "@radix-ui/themes";
import { Key } from "react";
import { prisma } from "@/app/lib/db";

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
              <Text>{entry.topic}</Text>
            </TableCell>
            <TableCell>
              <DialogRoot>
                <DialogTrigger>
                  <Button size="1" variant="outline">
                    Show Payload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Webhook Payload</DialogTitle>
                  <Separator my="2" size="4" />
                  <ScrollArea>
                    <Text size="1">
                      <pre>
                        {JSON.stringify(JSON.parse(entry.payload), null, 2)}
                      </pre>
                    </Text>
                  </ScrollArea>
                </DialogContent>
              </DialogRoot>
            </TableCell>
          </TableRow>
        ))}
      </TableRoot>
    </TabsContent>
  );
}
