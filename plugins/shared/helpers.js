import pathLib from "path";

export function generateDataAttributeValue(filePath, lineStart, lineEnd, root, absolute = false) {
  // Convert the absolute path to a path relative to the project root
  const relativeFilePath = absolute ? filePath : pathLib.relative(root || process.cwd(), filePath);
  return `${relativeFilePath}:${lineStart}:${lineEnd}`;
}
