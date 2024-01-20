import { parse, walk } from "svelte/compiler";
import MagicString from "magic-string";
import path from "path";
import { DATA_ONLOOK_ID } from "../shared/constants.js";
import { generateDataAttributeValue } from "../shared/helpers.js";

export const onlookPreprocess = (root = process.cwd()) => {
  return {
    markup: ({ content, filename }) => {
      const nodeModulesPath = path.resolve(root, "node_modules");
      // Check if the file is inside node_modules
      if (filename.startsWith(nodeModulesPath)) {
        return { code: content };
      }

      // Make the filename relative to the root
      const relativeFilename = path.relative(root, filename);

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
            const attributeName = `${DATA_ONLOOK_ID}='${attributeValue}'`;
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
};
