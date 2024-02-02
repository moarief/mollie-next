import { Flex, ScrollArea } from "@radix-ui/themes";
import { Text, Badge, TabsContent } from "@radix-ui/themes";

export default function OrderOverview(order: Object) {
  return (
    <TabsContent value="full">
      <Flex>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 600 }}>
          <Text>
            <pre>{JSON.stringify(order, null, 2)}</pre>
          </Text>
        </ScrollArea>
      </Flex>
    </TabsContent>
  );
}
