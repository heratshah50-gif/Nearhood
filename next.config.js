/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/properties", destination: "/listings?category=property", permanent: false },
      { source: "/vehicles", destination: "/listings?category=vehicle", permanent: false },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
