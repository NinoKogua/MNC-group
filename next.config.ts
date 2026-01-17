import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "geziyoo.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.hurimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "geziyoo.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hotsale.ge",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cf.bstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdnb.artstation.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.architonic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
