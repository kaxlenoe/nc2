/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pandascore.co',
                port: '',
                pathname: '**'
            },
        ],
    },}

module.exports = nextConfig
