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

export default function OrderStates(order: { state_histories: any[] }) {
  return (
    <TabsContent value="states">
      <TableRoot variant="ghost">
        {order.state_histories.map(
          (state_history: {
            state: string;
            created_at: string | number | Date;
          }) => (
            <TableRow key={state_history.created_at as Key}>
              <TableRowHeaderCell>
                <Text mr="4">
                  {new Date(state_history.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>
              </TableRowHeaderCell>
              <TableCell>
                <StateBadge state={state_history.state} />
              </TableCell>
            </TableRow>
          )
        )}
      </TableRoot>
    </TabsContent>
  );
}
