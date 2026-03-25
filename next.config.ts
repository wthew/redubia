import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    imageSizes: [720],
    remotePatterns: [
      { protocol: "https", hostname: `static.wikia.nocookie.net` },
      { protocol: "https", hostname: `${process.env.SUPABASE_ID}.supabase.co` },
    ],
  },
};

export default nextConfig;