import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["events-on.com", "www.events-on.com"],
      bodySizeLimit: "10mb",
    },
  },
};

export default withNextIntl(nextConfig);
