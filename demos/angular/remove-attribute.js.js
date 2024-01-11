const fs = require('fs');
const path = require('path');

function removeCustomAttributeFromHTMLFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      removeCustomAttributeFromHTMLFiles(filePath);
    } else if (filePath.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Xóa thuộc tính data-onlook-id
      content = content.replace(/data-onlook-id="[^"]*"/gi, '');
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

removeCustomAttributeFromHTMLFiles('src/app');
