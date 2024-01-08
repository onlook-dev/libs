import * as ts from 'typescript';
import { dataAttributeTransformer } from './index'; // replace with your actual file

describe('dataAttributeTransformer', () => {
  it('should add data-onlook-id attribute to JSX opening elements', () => {
    const source = `
    <div class="app">
      <button>Click me</button>
    </div>`;

    const expectedOutput = `<div class=\"app\" data-onlook-id=\"App.tsx:1\">
      <button data-onlook-id=\"App.tsx:2\">Click me</button>
    </div>;\n`;

    const sourceFile = ts.createSourceFile(
      'App.tsx', // A file name for the source file
      source,
      ts.ScriptTarget.Latest, // Or whatever script target you're working with
      true, // Set to true if your source code includes JSX
    );

    const result = ts.transform(
      sourceFile, [dataAttributeTransformer()]
    );

    const printer = ts.createPrinter();
    const transformedSourceCode = printer.printFile(result.transformed[0]);

    expect(transformedSourceCode).toBe(expectedOutput);
  });
});