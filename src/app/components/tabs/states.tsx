import { Text, Table, Tabs } from "@radix-ui/themes";
import { Key } from "react";
import StateBadge from "../ui/orderStateBadge";

export default function OrderStates(order: { state_histories: any[] }) {
  return (
    <Tabs.Content value="states">
      <Table.Root variant="ghost">
        {order.state_histories.map(
          (state_history: {
            state: string;
            created_at: string | number | Date;
          }) => (
            <Table.Row key={state_history.created_at as Key}>
              <Table.RowHeaderCell>
                <Text mr="4">
                  {new Date(state_history.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell>
                <StateBadge state={state_history.state} />
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Root>
    </Tabs.Content>
  );
}
