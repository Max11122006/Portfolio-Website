import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Renamed from 3d-printing-prototyping. Permanent so anything already
        // linking or indexed follows through instead of hitting a 404.
        source: "/projects/3d-printing-prototyping",
        destination: "/projects/3d-printer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
