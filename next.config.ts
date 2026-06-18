import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/EBB115-2016",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
