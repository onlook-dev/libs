# SWC-plugin

To test locally in a nextjs package, run:

```bash
npm link
```

Then, in your package, run:

```bash
npm link @swc/plugin-onlook-react
```

`@swc/plugin-onlook-react` is the package name in `package.json`

# Run in Nextjs project

1. Install library
2. Update `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@swc/plugin-onlook-react", {}]],
  },
};

module.exports = nextConfig;
```

Or `next.config.mjs`

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@swc/plugin-onlook-react", {}]],
  },
};

export default nextConfig;
```

For more, see: https://nextjs.org/docs/pages/api-reference/next-config-js
