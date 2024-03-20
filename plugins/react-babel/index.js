const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");
const generate = require("@babel/generator").default;
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const { DATA_ONLOOK_ID } = require("../shared/constants.js");
const { generateDataAttributeValue } = require("../shared/helpers.js");

const onlookBabelPlugin = ({ root = path.resolve('.'), absolute = false }) => {
  return {
    visitor: {
      Program(path, state) {
        const filename = state.file.opts.filename;
        const nodeModulesPath = path.resolve(root, "node_modules");

        // Ignore node_modules
        if (filename.startsWith(nodeModulesPath)) {
          return;
        }

        let offset = 0;
        try {
          // Calculate offset from typescript preprocessing step
          let data = fs.readFileSync(filename, "utf-8");
          let originalLineNum = data.split("\n").length;
          let postLineNum = path.node.loc.end.line;
          offset = originalLineNum - postLineNum;
        } catch (e) {
          offset = 0;
        }

        traverse(path.node, {
          JSXOpeningElement(jsxPath) {
            const node = jsxPath.node;

            // Calculate the line number for each element node
            const lineStart = node.loc.start.line + offset;
            const lineEnd = node.loc.end.line + offset;

            // Generate the attribute value
            const attributeValue = generateDataAttributeValue(
              filename,
              lineStart,
              lineEnd,
              lineEnd, // Assuming closing tag is on the same line
              root,
              absolute
            );

            // Create the JSX attribute
            const jsxAttribute = t.jsxAttribute(
              t.jsxIdentifier(DATA_ONLOOK_ID),
              t.stringLiteral(attributeValue)
            );

            // Add the attribute to the opening element
            jsxPath.node.attributes.push(jsxAttribute);
          }
        });
      }
    }
  };
};

module.exports = onlookBabelPlugin;