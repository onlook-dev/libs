const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function processDataOnlookId(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  const templateMatch = fileContent.match(/<template>([\s\S]*?)<\/template>/);
  if (!templateMatch) return; 

  let templateContent = templateMatch[1];
  const $ = cheerio.load(templateContent);

  $('*').each(function (index, element) {
    const lineNumber = index + 1;
    $(this).attr('data-onlook-id', `${path.basename(filePath)}:${lineNumber}`);
  });

  fileContent = fileContent.replace(/<template>([\s\S]*?)<\/template>/, `<template>${$.html()}</template>`);
  fs.writeFileSync(filePath, fileContent);
}

const vueFilesDir = path.join(__dirname, 'src');

fs.readdirSync(vueFilesDir).forEach(file => {
  if (file.endsWith('.vue')) {
    processDataOnlookId(path.join(vueFilesDir, file));
  }
});
