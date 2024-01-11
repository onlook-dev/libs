import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

export function addFilePathPreprocessor(sourceCode, filename) {
  const ast = parse(sourceCode, {
    sourceFilename: filename,
    plugins: ["jsx"],
  });

  traverse(ast, {
    JSXOpeningElement(path, state) {
      // Calculate the line number for each JSX element
      const lineNumber = path.node.loc.start.line;

      // Create a JSX attribute with the file path and line number
      const filePath = state.filename;
      const attribute = t.jsxAttribute(
        t.jsxIdentifier("data-onlook-id"),
        t.stringLiteral(`${filePath}:${lineNumber}`)
      );

      // Add the attribute to the JSX element
      path.node.attributes.push(attribute);
    },
  });

  // Generate the modified source code
  const { code, map } = generate(ast, {}, sourceCode);

  return {
    code,
    map,
  };
}
