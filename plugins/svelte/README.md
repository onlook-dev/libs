# Onlook svelte preprocessor

## Usage

1. Install library

```bash
npm i @onlook/svelte
```

2. Update `svelte.config.js`

```js
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { onlookPreprocess } from "@onlook/svelte"; // import onlook preprocessor

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    onlookPreprocess(), // Add onlook preprocessor
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
```

For more, see: https://kit.svelte.dev/docs/configuration
