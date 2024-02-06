import {
  Button,
  Flex,
  Heading,
  Card,
  Text,
  Grid,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Box,
  Separator,
  ScrollArea,
} from "@radix-ui/themes";
import { prisma } from "@/app/lib/db";
import StateBadge from "../components/ui/orderStateBadge";

export default async function Page() {
  const entryList = await prisma.webhooks.findMany();
  return (
    <main>
      <Flex direction="column" m="6">
        <Heading mb="4">Webhooks</Heading>
        <Grid
          columns={{
            xs: "1",
            md: "2",
            lg: "3",
          }}
          gap="5"
        >
          {entryList.map((entry) => (
            <Card key={entry.id} size="2">
              <Flex gap="1" direction="column">
                <Flex gap="2" justify="between">
                  <Text>Order ID</Text>
                  <Text>{entry.order_external_ref_id}</Text>
                </Flex>
                <Flex gap="2" justify="between">
                  <Text>Triggered at</Text>
                  <Text>
                    {new Date(entry.event_time).toLocaleString("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </Text>
                </Flex>
                <Flex gap="2" justify="between">
                  <Text>Topic</Text>
                  <Text>{entry.topic}</Text>
                </Flex>
              </Flex>
              <Flex justify="end" mt="2">
                <DialogRoot>
                  <DialogTrigger>
                    <Button size="1" variant="soft">
                      Show Payload
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Webhook Payload</DialogTitle>
                    <Separator my="2" size="4" />
                    <ScrollArea>
                      <Text size="1">
                        <pre>{entry.payload}</pre>
                      </Text>
                    </ScrollArea>
                  </DialogContent>
                </DialogRoot>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Flex>
    </main>
  );
}
