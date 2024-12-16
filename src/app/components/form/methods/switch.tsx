'use client';

import { SegmentedControl } from '@radix-ui/themes';

import React, { Suspense } from 'react';

import MethodsSkeleton from './methodskeleton';
import ComponentPaymentMethods from './componentpaymentmethods';

export default function MethodSwitch({ prop }: { prop: React.ReactNode }) {
    const [value, setValue] = React.useState('hpp');
    return (
        <>
            <SegmentedControl.Root
                size="1"
                mx="1"
                value={value}
                onValueChange={(value) => {
                    if (value) setValue(value);
                }}
            >
                <SegmentedControl.Item value="hpp">
                    Hosted Checkout
                </SegmentedControl.Item>
                <SegmentedControl.Item value="components">
                    Components
                </SegmentedControl.Item>
            </SegmentedControl.Root>
            {value === 'hpp' ? (
                <Suspense fallback={MethodsSkeleton()}>{prop}</Suspense>
            ) : (
                <Suspense fallback={MethodsSkeleton()}>
                    <ComponentPaymentMethods />
                </Suspense>
            )}
        </>
    );
}
