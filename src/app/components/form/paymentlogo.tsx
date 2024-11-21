import { Flex } from '@radix-ui/themes';
import Image from 'next/image';

export default async function PaymentLogo({ method }: { method: string }) {
    return (
        <Flex>
            <Image
                src={`https://mollie.com/external/icons/payment-methods/${method}.svg`}
                alt={method}
                height={32}
                width={32}
            />
        </Flex>
    );
}
