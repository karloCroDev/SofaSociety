import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'fashion-starter-demo.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
