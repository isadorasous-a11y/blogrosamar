/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['slugify'],
  },
};

export default nextConfig;
