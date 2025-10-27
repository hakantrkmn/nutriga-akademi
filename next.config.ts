import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "nutrigaakademi.com",
          },
        ],
        destination: "https://www.nutrigaakademi.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
