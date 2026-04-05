/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    typedRoutes: false
  }
};

export default nextConfig;
