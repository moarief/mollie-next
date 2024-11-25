/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true, // This is a temporary workaround to avoid build errors when using the mollie library 😬
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mollie.com',
                port: '',
                pathname: '/external/icons/payment-methods/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
