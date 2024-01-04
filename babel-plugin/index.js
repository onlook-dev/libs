const pathLib = require("path");

module.exports = (babel) => {
  const { types: t } = babel;
  // TODO: Move into common lib
  const dataAttributeName = "data-onlook-id";
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        const filePath = path.hub.file.opts.filename || "unknown";
        const lineNumber = path.node.loc.start.line;
        const dataAttributeValue = generateDataAttributeValue(
          filePath,
          lineNumber,
          state.opts.root
        );

        const dataAttribute = t.jSXAttribute(
          t.jSXIdentifier(dataAttributeName),
          t.stringLiteral(dataAttributeValue)
        );

        path.node.attributes.push(dataAttribute);
      },
    },
  };
};

function generateDataAttributeValue(filePath, lineNumber, root) {
  // Convert the absolute path to a path relative to the project root
  const projectRootPath = root || process.cwd();
  const relativeFilePath = pathLib.relative(projectRootPath, filePath);
  return `${relativeFilePath}:${lineNumber}`;
}
