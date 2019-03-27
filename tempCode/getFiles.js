var walk    = require('walk');
const fs = require('fs');
var files   = [];
var jsonObj = JSON.parse("");

// Walker options
var walker  = walk.walk('D:\\Share', { followLinks: false });

var tempRoot = null;
walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    if(root != tempRoot)
    files.push(root + '/' + stat.name);
    next();
});

walker.on('end', function() {
    //console.log(files);
    var resultFile = fs.writeFileSync('resultFile.json', 1, 'utf8');
});

