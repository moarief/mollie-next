'use client';

import { Select, Text } from '@radix-ui/themes';

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SelectCountry() {
    const [country, setCountry] = useState('DE');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleCountryChange(country: string) {
        setCountry(country);
        const params = new URLSearchParams(searchParams);
        if (country) {
            params.set('country', country);
        } else {
            params.delete('country');
        }
        replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    return (
        <>
            <Text as="label">Country</Text>
            <Select.Root
                value={country}
                onValueChange={handleCountryChange}
                defaultValue="DE"
                name="country"
                aria-label="Country"
                required
            >
                <Select.Trigger />
                <Select.Content>
                    <Select.Item
                        value="DE"
                        id="DE"
                        aria-label="Germany"
                    >
                        🇩🇪 Germany
                    </Select.Item>
                    <Select.Item
                        value="AT"
                        id="AT"
                        aria-label="Austria"
                    >
                        🇦🇹 Austria
                    </Select.Item>
                    <Select.Item
                        value="NL"
                        id="NL"
                        aria-label="Netherlands"
                    >
                        🇳🇱 Netherlands
                    </Select.Item>
                    <Select.Item
                        value="UK"
                        id="UK"
                        aria-label="United Kingdom"
                    >
                        🇬🇧 United Kingdom
                    </Select.Item>
                    <Select.Item
                        value="SE"
                        id="SE"
                        aria-label="Sweden"
                    >
                        🇸🇪 Sweden
                    </Select.Item>
                    <Select.Item
                        value="PT"
                        id="PT"
                        aria-label="Portugal"
                    >
                        🇵🇹 Portugal
                    </Select.Item>
                    <Select.Item
                        value="IT"
                        id="IT"
                        aria-label="Italy"
                    >
                        🇮🇹 Italy
                    </Select.Item>
                </Select.Content>
            </Select.Root>
        </>
    );
}
