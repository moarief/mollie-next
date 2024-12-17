'use client';

import { SegmentedControl } from '@radix-ui/themes';

import React, { Suspense } from 'react';

import MethodsSkeleton from './methodskeleton';
import ComponentPaymentMethods from './componentpaymentmethods';

export default function MethodSwitch({ prop }: { prop: React.ReactNode }) {
    // Use React State to switch between hosted and component payment methods
    // If the State is switched to 'hosted', the HostedPaymentMethods server component is rendered
    // If the State is switched to 'components', the ComponentPaymentMethods component is rendered
    // Because HostedPaymentMethods is a server component, it is retrieved as a prop
    const [segment, setSegment] = React.useState('hosted');
    return (
        <>
            <SegmentedControl.Root
                size="1"
                mx="1"
                value={segment}
                onValueChange={(segment) => {
                    if (segment) setSegment(segment);
                }}
            >
                <SegmentedControl.Item value="hosted">
                    Hosted Checkout
                </SegmentedControl.Item>
                <SegmentedControl.Item value="components">
                    Components
                </SegmentedControl.Item>
            </SegmentedControl.Root>
            {segment === 'hosted' ? (
                <Suspense fallback={MethodsSkeleton()}>{prop}</Suspense>
            ) : (
                <Suspense fallback={MethodsSkeleton()}>
                    <ComponentPaymentMethods />
                </Suspense>
            )}
        </>
    );
}
