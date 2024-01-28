import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@onlook/nextjs", { projectRoot: path.resolve(".") }]],
  },
};

export default nextConfig;
