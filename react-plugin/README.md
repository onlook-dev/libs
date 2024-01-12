# Preprocessor-babel-plugin

Prepends file name and line numbers for each console command, based on the source files.

Example:

```javascript
// test.jsx
const MyComponent = () => (
    <div>Hello World</div>
);
↓ ↓ ↓ ↓ ↓ ↓
const MyComponent = () => (
    <div data-onlook-id="test.jsx:3">Hello World</div>
);
```

## Usage

Step 1: import react-app-rewired
```sh
npm install react-app-rewired --save-dev
```
Step 2: change Scripts in 'package.json'

"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
}

Step 3: create config-overrides.js and add-onlook-id-loader.js

Step 4: run app
```sh
npm run start
```

### Notes

Template: https://www.npmjs.com/package/babel-plugin-console-source
