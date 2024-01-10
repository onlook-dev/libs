const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = process.argv[2] ? path.join(__dirname, process.argv[2]) : null;

if (!filePath || !fs.existsSync(filePath)) {
  console.error('File path is invalid or missing.');
  process.exit(1);
}

let htmlContent = fs.readFileSync(filePath, 'utf8');
const $ = cheerio.load(htmlContent);

$('*').each(function (index) {
  const lineNumber = index + 1;
  $(this).attr('data-onlook-id', `${path.basename(filePath)}:${lineNumber}`);
});

htmlContent = $.html();
fs.writeFileSync(filePath, htmlContent);
