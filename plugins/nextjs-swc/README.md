# Onlook nextjs preprocessor

## Usage

1. Install library

```bash
npm i --save-dev @onlook/nextjs
```

2. Update `next.config.mjs`

```mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@onlook/nextjs", { projectRoot: path.resolve(".") }]],
  },
};

export default nextConfig;
```

For more, see: https://nextjs.org/docs/pages/api-reference/next-config-js
