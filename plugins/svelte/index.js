import path from "path";
import MagicString from "magic-string";
import fs from "fs";

import { parse, walk } from "svelte/compiler";
import { DATA_ONLOOK_ID } from "../shared/constants.js";
import { generateDataAttributeValue } from "../shared/helpers.js";

export const onlookPreprocess = (root = process.cwd()) => {
  return {
    markup: ({ content, filename }) => {
      const nodeModulesPath = path.resolve(root, "node_modules");
      // Ignore node_modules
      if (filename.startsWith(nodeModulesPath)) {
        return { code: content };
      }

      // Calculate offset from typescript preprocessing step
      // TODO: This is a hack, doesn't account for script tag being at the bottom of the file
      let data = fs.readFileSync(filename);
      let originalLineNum = data.toString().split("\n").length;
      let postLineNum = content.split("\n").length;
      let offset = originalLineNum - postLineNum;

      // Make the filename relative to the root
      const relativeFilename = path.relative(root, filename);

      const ast = parse(content);
      const s = new MagicString(content, { filename });

      walk(ast.html, {
        enter(node) {
          if (node.type === "Element") {
            // Calculate the line number for each element node
            const lineStart =
              content.slice(0, node.start).split("\n").length + offset;

            // Find the end of the opening tag
            const tagContent = content.slice(node.start, node.end);
            let endOfOpeningTag = findEndOfOpeningTag(
              tagContent,
              node.start,
              node.selfClosing
            );
            const lineEnd =
              content.slice(0, endOfOpeningTag).split("\n").length + offset;

            // Find the position to insert the attribute
            const startTagEnd = node.start + node.name.length + 1;
            const attributeValue = generateDataAttributeValue(
              relativeFilename,
              lineStart,
              lineEnd
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

// Only find the closing character outside of nested logic
function findEndOfOpeningTag(tagContent, start, selfClosing) {
  let index = start;
  let stack = [];
  for (let i = 0; i < tagContent.length; i++) {
    const char = tagContent[i];
    const topOfStack = stack[stack.length - 1];

    if (char === '"' || char === "'") {
      if (topOfStack === char) {
        // End of string literal
        stack.pop();
      } else if (!topOfStack || ["(", "{", "["].includes(topOfStack)) {
        // Start of string literal
        stack.push(char);
      }
    } else if (["(", "{", "["].includes(char) && !topOfStack) {
      stack.push(char);
    } else if (
      (char === ")" && topOfStack === "(") ||
      (char === "}" && topOfStack === "{") ||
      (char === "]" && topOfStack === "[")
    ) {
      stack.pop();
    } else if (!stack.length) {
      if (
        char === ">" ||
        (selfClosing && char === "/" && tagContent[i + 1] === ">")
      ) {
        index += char === ">" ? i : i + 1;
        break;
      }
    }
  }
  return index;
}
