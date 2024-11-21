import { Flex } from '@radix-ui/themes';

export default async function PaymentLogo({ method }: { method: string }) {
    return (
        <Flex>
            <img
                src={`https://mollie.com/external/icons/payment-methods/${method}.svg`}
                alt={method}
            />
        </Flex>
    );
}
