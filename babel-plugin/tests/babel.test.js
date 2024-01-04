import path from "path";
import { transformSync } from "@babel/core";
import zeroBabelPlugin from "../index";

describe("babel plugin", () => {
  test("adds data-onlook-id to JSX elements", () => {
    const inputCode = `
      const test = "test";
      const MyComponent = () => (
        <div>Hello World</div>
      );
    `;

    // Use a mock project root path
    const projectRootPath = "/mock/project/root";
    const testFileName = "test-file.jsx";

    const { code } = transformSync(inputCode, {
      filename: path.join(projectRootPath, testFileName), // Combine root path with test file name
      presets: ["@babel/preset-react"],
      plugins: [[zeroBabelPlugin, { root: projectRootPath }]], // Provide the root path to the plugin
    });

    // Construct the expected attribute value
    const expectedLineNumber = 4;

    // TODO: Move into common lib
    const expectedValue = `"data-onlook-id": "${testFileName}:${expectedLineNumber}"`;

    expect(code).toContain(expectedValue);
  });
});
