var express = require('express');
var fs = require('fs');

var contents = fs.readFileSync('app.json', 'utf8');
var jsonObj = JSON.parse(contents);

var rootPath = jsonObj.dirPath;
var fileName2 = jsonObj.fileName;
var fileSize = jsonObj.fileSize;

var router = express.Router();

function initFiles(path) {
  console.log("initFiles is working");
  var _files = [];

  fs.readdirSync(path).forEach(file => {
    var _file = new Object();
    var __dirPath = path + '/' + file;

    var dir = fs.lstatSync(__dirPath);

    _file.name = file;
    _file.path = __dirPath;
    _file.type = dir.isDirectory();

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

function renderHomepage(res, _path) {
  var __files = initFiles(_path);
  res.render('index', { title: 'Doraneko', files: __files });
}


/* GET home page. */
router.get('/', function (req, res, next) {
  var _path = rootPath;
  renderHomepage(res, _path);
});

router.post('/', function (req, res) {
  var _path = req.body.path;
  renderHomepage(res, _path);
});

// router.get('/download/:id', (req, res) => {
//   if (include(fileName2, req.params.id) == true) res.download(filePath + req.params.id, req.params.id);
//   else res.render('filenotfound');
// });
module.exports = router;
