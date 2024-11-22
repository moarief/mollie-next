import { Flex, Heading } from '@radix-ui/themes';
import PaymentsTable from '@/app/components/ui/paymentstable';
import { revalidatePath } from 'next/cache';

export default function Page() {
    return (
        <main>
            <Flex
                direction="column"
                m="6"
            >
                <Heading>Recent Payments</Heading>
                <PaymentsTable />
            </Flex>
        </main>
    );
}
