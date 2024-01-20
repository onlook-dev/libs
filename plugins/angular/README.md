# Angular Plugin

This is a TypeScript project that uses a custom transformer to add a `data-onlook-id` attribute to JSX elements. The value of the attribute is a string that represents the file path and the line number of the JSX element in the source code.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

A step by step series of examples that tell you how to get a development environment running.
```sh 
npm install
```

### Built With

 - TypeScript - Used for static typing
 - Babel - Used to transpile TypeScript to JavaScript

### Run addDataOnlookIdToAllTags

```sh
npm run prebuild src/app/app.component.html
```
With 'src/app/app.component.html' is filePath