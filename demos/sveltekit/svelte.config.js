import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { onlookPreprocess } from "@onlook/svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), onlookPreprocess()],
  kit: {
    adapter: adapter(),
  },
};

export default config;
