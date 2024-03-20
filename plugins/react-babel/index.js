const { default: generate } = require('@babel/generator');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const { generateDataAttributeValue } = require("../shared/helpers.js");
const { DATA_ONLOOK_ID } = require("../shared/constants.js");

module.exports = function babelPluginOnlook({ root = process.cwd(), absolute = false }) {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        const filename = state.file.opts.filename;
        const nodeModulesPath = `${root}/node_modules`;

        // Ignore node_modules
        if (filename.startsWith(nodeModulesPath)) {
          return;
        }

        const attributeValue = generateDataAttributeValue(
          filename,
          path.node.loc.start.line,
          path.node.loc.end.line,
          root,
          absolute
        );

        // Create the custom attribute
        const onlookAttribute = t.jSXAttribute(
          t.jSXIdentifier(DATA_ONLOOK_ID),
          t.stringLiteral(attributeValue)
        );

        // Append the attribute to the element
        path.node.attributes.push(onlookAttribute);
      },
    },
  };
};