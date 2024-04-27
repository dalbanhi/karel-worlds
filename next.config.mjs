/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            }
        ],

        // domains: ['lh3.googleusercontent.com'],
      },
};

export default nextConfig;
