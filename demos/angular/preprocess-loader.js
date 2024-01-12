const path = require('path');
module.exports = function (source) {
    const filePath = path.basename(this.resourcePath);
    const lines = source.split('\n');
    let lineNumber = 0;
  
    const preprocessedSource = lines.map(line => {
      lineNumber++;
      if (line.match(/<\w+/)) {
        return line.replace(/<(\w+)/, `<$1 data-onlook-id="${filePath}:${lineNumber}"`);
      }
      return line;
    }).join('\n');
  
    console.log("ahihi");
    return preprocessedSource;
  };
  