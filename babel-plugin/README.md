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

```sh
npm run prebuild src/App.js
```
With src/App.js is fullPath

### Notes

Template: https://www.npmjs.com/package/babel-plugin-console-source
