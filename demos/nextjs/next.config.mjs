/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@swc/plugin-onlook-react", {}]],
  },
};

export default nextConfig;
