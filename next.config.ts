import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
              "script-src-elem 'self' 'unsafe-inline' https://challenges.cloudflare.com",
              "frame-src 'self' https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://challenges.cloudflare.com",
              "worker-src blob: https://challenges.cloudflare.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
