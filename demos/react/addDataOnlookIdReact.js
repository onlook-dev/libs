const fs = require('fs');
const pathModule = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types'); 
const filePath = process.argv[2];
if (!filePath) {
  console.error('No file path provided');
  process.exit(1);
}

const fullPath = pathModule.join(__dirname, filePath);
const fileContent = fs.readFileSync(fullPath, 'utf8');

const ast = parser.parse(fileContent, {
  sourceType: 'module',
  plugins: ['jsx']
});

traverse(ast, {
  JSXOpeningElement(path) {
    const lineNumber = path.node.loc.start.line;
    const fileName = pathModule.basename(filePath);
    const dataValue = `${fileName}:${lineNumber}`;
    
    const newAttribute = t.jsxAttribute(
      t.jsxIdentifier('data-onlook-id'),
      t.stringLiteral(dataValue)
    );

    path.node.attributes.push(newAttribute);
  }
});

const output = generator(ast, {}, fileContent);
fs.writeFileSync(fullPath, output.code);
