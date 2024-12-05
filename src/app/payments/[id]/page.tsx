import { Flex, Heading, Code } from '@radix-ui/themes';

import { validateMolliePayment } from '@/app/lib/validation';
import PaymentOverview from '@/app/components/ui/paymentoverview';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const input = (await params).id;
    const id = await validateMolliePayment(input);
    return (
        <Flex
            direction="column"
            m="6"
        >
            <Heading>
                Payment: &nbsp;
                <Code variant="ghost">{id}</Code>
            </Heading>
            <PaymentOverview id={id} />
        </Flex>
    );
}
