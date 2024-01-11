const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

function addAttributeToHTMLFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      addAttributeToHTMLFiles(filePath);
    } else if (filePath.endsWith(".html")) {
      let content = fs.readFileSync(filePath, "utf8");
      const $ = cheerio.load(content, { decodeEntities: false });

      // Lấy nội dung HTML
      const htmlContent = $.html();

      // Tách thành từng dòng
      const lines = htmlContent.split("\n");

      // Duyệt qua từng dòng và thêm thuộc tính data-onlook-id
      const modifiedLines = lines.map((line, index) => {
        const relativeFilePath = path.relative(dir, filePath);
        const lineNumber = index + 1; // Dòng hiện tại
        const dataOnlookId = `${relativeFilePath}:${lineNumber}`;
        return line.replace(
          /<([a-z][a-z0-9]*)(\s|>)/gi,
          `<$1 data-onlook-id="${dataOnlookId}"$2`
        );
      });

      // Ghi lại nội dung của file HTML với các thuộc tính data-onlook-id đã thêm
      content = modifiedLines.join("\n");
      fs.writeFileSync(filePath, content, "utf8");
    }
  });
}

// Thay 'src/app' bằng thư mục chứa các file HTML của bạn
addAttributeToHTMLFiles("src/app");
