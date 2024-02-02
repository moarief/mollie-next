import { Flex, Link } from "@radix-ui/themes";
import { Text, Badge, TabsContent } from "@radix-ui/themes";
import { Key } from "react";

export default function OrderInvoices(order: { invoices: any[] }) {
  return (
    <TabsContent value="invoices">
      <Flex>
        <Flex direction="column" gap="2">
          {order.invoices.map(
            (invoice: {
              uuid: Key | null | string;
              created_at: string | number | Date;
              gross_amount_cents: number;
              invoice_url: string;
            }) => (
              <Flex key={invoice.uuid} direction="row" justify="between">
                <Flex>
                  <Text mr="4">
                    {new Date(invoice.created_at).toLocaleString("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </Text>
                  <Link href={invoice.invoice_url}>Invoice PDF</Link>
                  <Badge ml="4">
                    {(invoice.gross_amount_cents / 100).toLocaleString(
                      "de-DE",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </Badge>
                </Flex>
              </Flex>
            )
          )}
        </Flex>
      </Flex>
    </TabsContent>
  );
}
