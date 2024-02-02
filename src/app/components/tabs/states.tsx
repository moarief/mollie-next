import { Flex } from "@radix-ui/themes";
import { Text, Badge, TabsContent } from "@radix-ui/themes";
import { Key } from "react";

export default function OrderStates(order: { state_histories: any[] }) {
  return (
    <TabsContent value="states">
      <Flex>
        <Flex direction="column" gap="2">
          {order.state_histories.map(
            (state_history: {
              state: string;
              created_at: string | number | Date;
            }) => (
              <Flex key={state_history.created_at as Key}>
                <Flex direction="row" justify="between">
                  <Text mr="4">
                    {new Date(state_history.created_at).toLocaleString(
                      "de-DE",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                  </Text>
                  <Badge>{state_history.state}</Badge>
                </Flex>
              </Flex>
            )
          )}
        </Flex>
      </Flex>
    </TabsContent>
  );
}
