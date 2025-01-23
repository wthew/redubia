const base_api_host =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:5328" : "";
const api_mapper = process.env.NODE_ENV === "development" ? ":path*" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    base_api_url: base_api_host + "/api",
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: base_api_host + "/api/" + api_mapper,
      },
    ];
  },
  images: {
    imageSizes: [720],
    remotePatterns: [
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
    ],
  },
};

module.exports = nextConfig;
