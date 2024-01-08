const { parse } = require('@vue/compiler-sfc');
const pathLib = require('path');

module.exports = function(source, resourcePath) {
  const { descriptor } = parse(source);

  if (descriptor.template) {
    const { loc } = descriptor.template;
    const template = source.substring(loc.start.offset, loc.end.offset);

    const modifiedTemplate = template.replace(/<([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tag, offset) => {
      const lineNumber = source.substring(0, offset).split('\n').length;
      const dataAttributeValue = generateDataAttributeValue(resourcePath, lineNumber);
      return match.replace('>', ` data-onlook-id="${dataAttributeValue}">`);
    });

    return source.replace(template, modifiedTemplate);
  }

  return source;
};

function generateDataAttributeValue(filePath, lineNumber) {
  const relativeFilePath = pathLib.relative(process.cwd(), filePath);
  return `${relativeFilePath}:${lineNumber}`;
}