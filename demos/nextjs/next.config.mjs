/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@onlook/nextjs", {}]],
  },
};

export default nextConfig;
