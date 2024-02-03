import {
  Link,
  TableRoot,
  TableCell,
  TableRow,
  TableRowHeaderCell,
  Flex,
} from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Text, Badge, TabsContent } from "@radix-ui/themes";
import { Key } from "react";

export default function OrderInvoices(order: { invoices: any[] }) {
  return (
    <TabsContent value="invoices">
      <TableRoot variant="ghost">
        {order.invoices.map(
          (invoice: {
            uuid: Key | null | string;
            created_at: string | number | Date;
            gross_amount_cents: number;
            invoice_url: string;
          }) => (
            <TableRow key={invoice.uuid}>
              <TableRowHeaderCell>
                <Text>
                  {new Date(invoice.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>
              </TableRowHeaderCell>
              <TableCell>
                <Badge color="green">
                  {(invoice.gross_amount_cents / 100).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={invoice.invoice_url}>
                  <Flex align="center" gap="2">
                    <DownloadIcon width="16" height="16" />
                    <Text>Download Invoice PDF</Text>
                  </Flex>
                </Link>
              </TableCell>
            </TableRow>
          )
        )}
      </TableRoot>
    </TabsContent>
  );
}
