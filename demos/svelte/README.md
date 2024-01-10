## Demo
Check out how the svelte preprocessor is used in `svelte.config.js`. 
It is integrated into the build steps, injecting `data-onlook-id` at build time.

## Running demo
To run this demo locally:

1. First run `npm link` in `svelte-plugin`. This will create a global package from the `svelte-plugin` library.

2. Then, in this package, run `npm link onlook-svelte`.

3. Then, run `npm install` and `npm run dev` as you would regularly.

4. Now, when you open `localhost`, notice in the DOM how the ID's are injected without changing the code.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
