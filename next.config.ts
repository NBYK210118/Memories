import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["localhost"],
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
            port: "5000", 
            pathname: "/static/**", 
          },
        ],
      },
};

export default nextConfig;
