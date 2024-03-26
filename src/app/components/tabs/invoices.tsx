import { Link, Table, Flex } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Text, Badge, Tabs } from "@radix-ui/themes";
import { Key } from "react";

export default function OrderInvoices(order: { invoices: any[] }) {
  return (
    <Tabs.Content value="invoices">
      <Table.Root variant="ghost">
        {order.invoices.map(
          (invoice: {
            uuid: Key | null | string;
            created_at: string | number | Date;
            gross_amount_cents: number;
            invoice_url: string;
          }) => (
            <Table.Row key={invoice.uuid}>
              <Table.RowHeaderCell>
                <Text>
                  {new Date(invoice.created_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell>
                <Badge color="green">
                  {(invoice.gross_amount_cents / 100).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Link href={invoice.invoice_url}>
                  <Flex align="center" gap="2">
                    <DownloadIcon width="16" height="16" />
                    <Text>Download Invoice PDF</Text>
                  </Flex>
                </Link>
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Root>
    </Tabs.Content>
  );
}
