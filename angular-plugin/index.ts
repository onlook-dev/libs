import * as ts from 'typescript';
import * as pathLib from "path";

export function dataAttributeTransformer(): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    const visit: ts.Visitor = (node) => {
      if (ts.isJsxOpeningElement(node)) {
        const filePath = node.getSourceFile().fileName || "unknown";
        const lineNumber = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line;
        const dataAttributeValue = `${filePath}:${lineNumber}`;

        const dataAttribute = ts.factory.createJsxAttribute(
          ts.factory.createIdentifier('data-onlook-id'),
          ts.factory.createStringLiteral(dataAttributeValue)
        );

        const attributes = ts.factory.createJsxAttributes([...node.attributes.properties, dataAttribute]);
        return ts.factory.updateJsxOpeningElement(node, node.tagName, node.typeArguments, attributes);
      } else if (ts.isJsxSelfClosingElement(node)) {
        const filePath = node.getSourceFile().fileName || "unknown";
        const position = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart());
        const lineNumber = position.line + 1;
        const dataAttributeValue = `${generateDataAttributeValue(filePath, lineNumber)}`;

        const dataAttribute = ts.factory.createJsxAttribute(
          ts.factory.createIdentifier('data-onlook-id'),
          ts.factory.createStringLiteral(dataAttributeValue)
        );

        const attributes = ts.factory.createJsxAttributes([...node.attributes.properties, dataAttribute]);
        return ts.factory.updateJsxSelfClosingElement(node, node.tagName, node.typeArguments, attributes);
      }
      return ts.visitEachChild(node, visit, context);
    };

    return (node: ts.SourceFile) => ts.visitNode(node, visit) as ts.SourceFile;
  };
}

function generateDataAttributeValue(filePath: string, lineNumber: number): string {
  const projectRootPath = process.cwd();
  const relativeFilePath = pathLib.relative(projectRootPath, filePath);
  return `${relativeFilePath}:${lineNumber}`;
}
