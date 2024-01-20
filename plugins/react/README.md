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

1. Install library

```sh
npm install --save-dev babel-plugin-onlook
```

3. Add .babelrc

```.babelrc
{
  "presets": ["next/babel"],
  "plugins": ["onlook"]
}
```
