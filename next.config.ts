import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Pages serves /_next/image as the untouched original, so the optimiser is noise.
    // Raster images are pre-rendered by scripts/optimize-images.mjs instead.
    unoptimized: true,
  },
};

export default nextConfig;
