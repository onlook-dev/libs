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

### Installation

```bash
$ bun i -D 0-plugin
```

### Babel

.babelrc

```javascript
{
    "plugins": [

        // consoleSource // No options required

        // You can pass in the following options
        ["console-source", {
            "key": "22496d171d14e2600e0a0abd82ea050fa8867ec57a9a67f827e98ed4a45b5e74",
            // REQUIRED
            // Key should be 32 bytes for AES-256
            // crypto.randomBytes(32);

            "root": "root/of/your/project"
            // OPTIONAL
            // Defaults to where the script is run (usually root of the project)
            // process.cwd()
        }]
    ]
}
```

### Vite

.babelrc

```javascript
{
    "plugins": [

        // consoleSource // No options required

        // You can pass in the following options
        ["console-source", {
            "key": "22496d171d14e2600e0a0abd82ea050fa8867ec57a9a67f827e98ed4a45b5e74",
            // REQUIRED
            // Key should be 32 bytes for AES-256
            // crypto.randomBytes(32);

            "root": "root/of/your/project"
            // OPTIONAL
            // Defaults to where the script is run (usually root of the project)
            // process.cwd()
        }]
    ]
}
```

### Testing

```bash
bun test
```

### Notes

Template: https://www.npmjs.com/package/babel-plugin-console-source
