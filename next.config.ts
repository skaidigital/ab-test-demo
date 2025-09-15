import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    clientSegmentCache: true,
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
