const pathLib = require("path");

exports.generateDataAttributeValue = function (filePath, lineNumber, root) {
  // Convert the absolute path to a path relative to the project root
  const projectRootPath = root || process.cwd();
  const relativeFilePath = pathLib.relative(projectRootPath, filePath);
  return `${relativeFilePath}:${lineNumber}`;
};