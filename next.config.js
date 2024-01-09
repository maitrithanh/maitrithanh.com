/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.buymeacoffee.com",
                pathname: '**',
            }
        ]
    }
}

module.exports = nextConfig
