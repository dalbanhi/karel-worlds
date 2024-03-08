/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            }
        ],

        // domains: ['lh3.googleusercontent.com'],
      },
};

export default nextConfig;
