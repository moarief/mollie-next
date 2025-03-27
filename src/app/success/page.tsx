'use client';

import { RocketIcon } from '@radix-ui/react-icons';
import { Callout, Flex, Heading, Em } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the confetti component to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function Page() {
    const router = useRouter();
    const [showConfetti, setShowConfetti] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    // Green color palette for confetti
    const greenColors = [
        '#1a5d1a', // Dark Forest Green
        '#38a169', // Forest Green
        '#48bb78', // Green
        '#68d391', // Light Green
        '#9ae6b4', // Pale Green
        '#c6f6d5', // Mint Green
        '#22c55e', // Emerald Green
        '#86efac', // Spring Green
    ];

    // Handle window resizing
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Stop confetti after 6.5 seconds
    useEffect(() => {
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 6500);

        return () => clearTimeout(confettiTimer);
    }, []);

    // Redirect to checkout after 7 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/checkout');
        }, 7000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main>
            {showConfetti && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    numberOfPieces={150}
                    recycle={false}
                    gravity={0.15}
                    tweenDuration={5000}
                    initialVelocityY={10}
                    colors={greenColors}
                />
            )}
            <Flex
                direction="column"
                m="6"
            >
                <Heading>Success</Heading>
                <Flex
                    align="center"
                    justify="center"
                    mt="4"
                >
                    <Callout.Root
                        size="3"
                        color="green"
                    >
                        <Callout.Icon>
                            <RocketIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            Thank you for your payment! You'll be redirected to
                            the checkout soon to pay <Em>even more!</Em>
                        </Callout.Text>
                    </Callout.Root>
                </Flex>
            </Flex>
        </main>
    );
}
