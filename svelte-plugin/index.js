import { parse, walk } from "svelte/compiler";
import MagicString from "magic-string";
import path from "path";

export function addFilePathPreprocessor(root = process.cwd()) {
  return {
    markup: ({ content, filename }) => {
      const nodeModulesPath = path.resolve(root, "node_modules");
      // Check if the file is inside node_modules
      if (filename.startsWith(nodeModulesPath)) {
        return { code: content };
      }

      // Make the filename relative to the root
      const relativeFilename = path.relative(root, filename);
      // TODO: Move into common lib
      const attributeKey = "data-onlook-id";

      const ast = parse(content);
      const s = new MagicString(content, { filename });

      walk(ast.html, {
        enter(node) {
          if (node.type === "Element") {
            // Calculate the line number for each element node
            const lineNumber = content.slice(0, node.start).split("\n").length;

            // Find the position to insert the attribute
            const startTagEnd = node.start + node.name.length + 1;
            const attributeValue = generateDataAttributeValue(
              relativeFilename,
              lineNumber
            );
            const attributeName = `${attributeKey}='${attributeValue}'`;
            s.appendLeft(startTagEnd, ` ${attributeName}`);
          }
        },
      });

      return {
        code: s.toString(),
        map: s.generateMap({ hires: true }),
      };
    },
  };
}

function generateDataAttributeValue(relativeFilePath, lineNumber) {
  // Convert the absolute path to a path relative to the project root
  // TODO: Add encryption
  return `${relativeFilePath}:${lineNumber}`;
}
