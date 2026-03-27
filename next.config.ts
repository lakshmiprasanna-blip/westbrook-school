import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'westbrookinternational.com',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;