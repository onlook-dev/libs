# Onlook nextjs preprocessor

## Usage

1. Install library

```bash
npm i @onlook/nextjs
```

2. Update `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@onlook/nextjs", {}]],
  },
};

module.exports = nextConfig;
```

Or `next.config.mjs`

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@onlook/nextjs", {}]],
  },
};

export default nextConfig;
```

For more, see: https://nextjs.org/docs/pages/api-reference/next-config-js
