const fs = require('fs');
//const fa = require('fs');
//const testFolder = 'D://share';


var contents = fs.readFileSync('app.json', 'utf8');
var jsonObj = JSON.parse(contents);

var rootPath = jsonObj.dirPath;

// fs.readdirSync(rootPath).forEach(file => {
//     var dir = fs.lstatSync(rootPath + '/' + file);
//     //console.log(testFolder + '/' + file);
//     console.log(file + " ......is Folder: " + dir.isDirectory());
// });

function initFiles(path) {
    var _files = [];

    // var _file = {
    //     name = "",
    //     size = 0,
    //     path = "",
    //     type = false //true is Dir, false is File
    // };

    

    fs.readdirSync(path).forEach(file => {
        var _file = new Object();
        //console.log("forEach is working");
        var __dirPath = path + '/' + file;

        var dir = fs.lstatSync(__dirPath);

        _file.name = file;
        _file.path = __dirPath;
        _file.type = dir.isDirectory();
        //console.log(_file.name);
        if (!_file.type) {
            const rarFileBytes = fs.statSync(__dirPath);
            var sizeGB = rarFileBytes.size / 1000000000;
            _file.size = Math.round(sizeGB * 100) / 100;
        } else {
            _file.size = 'NaN';
        }
        _files.push(_file);
    });
    return _files;
}

var files = [];
files = initFiles(rootPath);
console.log(files);