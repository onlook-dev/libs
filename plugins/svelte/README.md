# Svelte-plugin

To test locally in a svelte package, run:

```bash
npm link
```

Then, in your package, run:

```bash
npm link onlook-svelte
```

`onlook-svelte` is the package name in `package.json`

# Run in svelte project

1. Install library
2. Update `svelte.config.js`

```js
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { onlookPreprocess } from "onlook-svelte"; // import onlook preprocessor

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
