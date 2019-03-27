const fs = require('fs');

var appFile = fs.readFileSync('app.json', 'utf8');

var jsonObj = JSON.parse(appFile);

var size = [];

var fileName = jsonObj.fileName;
fileName.forEach(element => {
    const rarFileBytes = fs.statSync(jsonObj.dirPath + element);
    var sizeGB = rarFileBytes.size/1000000000;
    var sizeGBround = Math.round(sizeGB*100)/100;
    size.push(sizeGBround);
});

jsonObj.fileSize = size;
var end = JSON.stringify(jsonObj);
fs.writeFileSync('app.json', end, 'utf8');
console.log(end);