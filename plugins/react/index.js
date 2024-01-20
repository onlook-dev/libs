const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const babelTypes = require("@babel/types");
const path = require("path");

const { DATA_ONLOOK_ID } = require("../shared/constants");
const { generateDataAttributeValue } = require("../shared/helpers");

module.exports = function (source) {
  const self = this;
  const ast = parser.parse(source, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  traverse(ast, {
    JSXOpeningElement(pathNode) {
      const fileName = path.basename(self.resourcePath);
      const lineNumber = pathNode.node.loc.start.line;
      const dataOnlookIdValue = generateDataAttributeValue(
        fileName,
        lineNumber
      );

      const dataOnlookIdAttribute = babelTypes.jsxAttribute(
        babelTypes.jsxIdentifier(DATA_ONLOOK_ID),
        babelTypes.stringLiteral(dataOnlookIdValue)
      );

      pathNode.node.attributes.push(dataOnlookIdAttribute);
    },
  });

  const output = generate(ast, {}, source);
  return output.code;
};
