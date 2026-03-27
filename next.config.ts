import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/blogs/**',
      },
      {
        pathname: '/assets/**',  // covers logo and all other images
      },
    ],
  },
};

export default nextConfig;