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
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    imageSizes: [720],
    remotePatterns: [
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
      { protocol: "https", hostname: `${process.env.SUPABASE_ID}.supabase.co` },
    ],
  },
};

module.exports = nextConfig;
