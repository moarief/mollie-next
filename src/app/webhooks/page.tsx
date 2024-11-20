"use server";

import {
  Button,
  Flex,
  Heading,
  Card,
  Text,
  Grid,
  Dialog,
  Separator,
  ScrollArea,
  Badge,
} from "@radix-ui/themes";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import Pagination from "@/app/components/ui/pagination";

export default async function Page(
  props: {
    searchParams: Promise<{ page: number; per_page: number }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const per_page = Number(searchParams.per_page) || 10;
  const entryList = await prisma.webhooks.findMany({
    take: per_page,
    skip: (page - 1) * per_page,
    orderBy: {
      event_time: "desc",
    },
  });
  revalidatePath("/webhooks");
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading mb="4">Webhooks</Heading>
        <Grid
          columns={{
            xs: "1",
            md: "2",
          }}
          gap="5"
        >
          {entryList.map((entry) => (
            <Card key={entry.id} size="2">
              <Flex gap="1" direction="column">
                <Flex gap="2" justify="between">
                  <Text>Order ID</Text>
                  <Badge color="gray">{entry.external_reference_id}</Badge>
                </Flex>
                <Flex gap="2" justify="between">
                  <Text>Triggered at</Text>
                  <Badge color="gray">
                    {new Date(entry.event_time).toLocaleString("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </Badge>
                </Flex>
                <Flex gap="2" justify="between">
                  <Text>Topic</Text>
                  <Badge color="gray">{entry.topic}</Badge>
                </Flex>
              </Flex>
              <Separator m="3" size="4" />
              <Flex justify="end" mt="2" gap="3">
                <Button size="1" variant="outline" asChild>
                  <Link href={`/orders/${entry.order_uuid}`}>
                    Order details
                  </Link>
                </Button>
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
              </Flex>
            </Card>
          ))}
        </Grid>
        <Flex justify="center">
          <Pagination page={page} />
        </Flex>
      </Flex>
    </main>
  );
}
