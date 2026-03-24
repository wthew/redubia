/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    imageSizes: [720],
    remotePatterns: [
      { protocol: "https", hostname: `static.wikia.nocookie.net` },
      { protocol: "https", hostname: `${process.env.SUPABASE_ID}.supabase.co` },
    ],
  },
};

module.exports = nextConfig;
