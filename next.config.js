/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.buymeacoffee.com",
                pathname: '**',
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
                pathname: '**',
            }
        ]
    }
}

module.exports = nextConfig
