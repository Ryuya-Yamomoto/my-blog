import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.microcms-assets.io"],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
