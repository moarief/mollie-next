/** @type {import('next').NextConfig} */
const nextConfig = {
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
