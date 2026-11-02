import type { NextConfig } from "next";

const API_URL = (process.env.API_URL || "http://localhost:5000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The browser only ever talks to this origin; /api/* is forwarded to the Express server.
  // That keeps the HTTPOnly JWT cookie first-party, so it survives reloads even where third-party cookies are blocked.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
