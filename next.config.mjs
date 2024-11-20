/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
    ignoreBuildErrors: true // This is a temporary workaround to avoid build errors when using the mollie library 😬
    },
};

export default nextConfig;
