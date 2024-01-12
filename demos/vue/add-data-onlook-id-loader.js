const path = require('path');
module.exports = function(source) {
    const fileName = path.basename(this.resourcePath);
    let lineNumber = 0;
    let modifiedSource = source.replace(/<([a-z]+)(\s|>)/gi, (match, tagName, trailing) => {
        lineNumber++;
        return `<${tagName} data-onlook-id="${fileName}:${lineNumber}"${trailing}`;
    });
    return modifiedSource;
};
