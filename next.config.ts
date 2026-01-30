import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allows Next.js to optimize images from these specific external sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.fna.fbcdn.net", // Wildcard handles all Facebook CDN subdomains (fknu1-4, fknu1-6, etc.)
      },
      {
        protocol: "https",
        hostname: "examrankcheck.vercel.app",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Recommended for the placeholder project images used in your cards
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
      {
        protocol: "https",
        hostname: "pics.clipartpng.com",
      }
    ],
    // Optimization: Reduces server load by allowing local image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression in 2026
  },
  // Modern Next.js apps often benefit from experimental features like typedRoutes
  experimental: {
    typedRoutes: true,
  }
};

export default nextConfig;