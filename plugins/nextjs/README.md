# Onlook nextjs preprocessor

## Usage

1. Install preprocessor library

```bash
npm i --save-dev @onlook/nextjs
```

2. Update `next.config.mjs` or `next.config.js`

```js
// Import path
import path from "path";

const nextConfig = {
  // Add preprocessor
  experimental: {
    swcPlugins: [["@onlook/nextjs", { root: path.resolve(".") }]],
  },
};

export default nextConfig;
```

For more, see: https://nextjs.org/docs/pages/api-reference/next-config-js
