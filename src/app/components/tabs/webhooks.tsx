"use server";

import {
  Text,
  Table,
  Dialog,
  Tabs,
  Button,
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
    <Tabs.Content value="webhooks">
      <Table.Root variant="ghost">
        {entryList.map((entry) => (
          <Table.Row key={entry.id as Key}>
            <Table.RowHeaderCell>
              <Text mr="4">
                {new Date(entry.event_time).toLocaleString("de-DE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Text>
            </Table.RowHeaderCell>
            <Table.Cell>
              <Text>{entry.topic}</Text>
            </Table.Cell>
            <Table.Cell>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button size="1" variant="outline">
                    Show Payload
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Title>Webhook Payload</Dialog.Title>
                  <Separator my="2" size="4" />
                  <ScrollArea>
                    <Text size="1">
                      <pre>
                        {JSON.stringify(JSON.parse(entry.payload), null, 2)}
                      </pre>
                    </Text>
                  </ScrollArea>
                </Dialog.Content>
              </Dialog.Root>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>
    </Tabs.Content>
  );
}
