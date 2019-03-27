var express = require('express');
var fs = require('fs');
var fsize = require('filesize');
var path = require('path');

var contents = fs.readFileSync('app.json', 'utf8');

var jsonObj = JSON.parse(contents);

var rootPath = jsonObj.dirPath;

var router = express.Router();

function initFiles(path) {
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
      //console.log(rarFileBytes);
      _file.size = fsize(rarFileBytes.size, { round: 0 });
    } else {
      _file.size = '';
    }
    _files.push(_file);
  });
  return _files;
}

function renderHomepage(res, _path) {
  contents = fs.readFileSync('app.json', 'utf8');

  jsonObj = JSON.parse(contents);

  rootPath = jsonObj.dirPath;
  var __files = initFiles(_path);
  res.render('index', { title: 'Doraneko', files: __files });
}


/* GET home page. */
router.get('/browser', function (req, res, next) {
  var _path;
  if (req.query.p == null) _path = rootPath;
  else _path = req.query.p;
  if (_path.includes(rootPath.replace('/', '\\')))
    renderHomepage(res, _path);
  else render('filenotfound');
});

router.get('/', function (req, res, next) {
  res.redirect('/browser');
});

router.get('/download', (req, res) => {
  // if (include(fileName2, req.params.id) == true) res.download(filePath + req.params.id, req.params.id);
  // else res.render('filenotfound');
  //console.log(req.params.id);
  //console.log("path is: " + req.query.p + "," + rootPath);
  var _path = req.query.p;
  var _options = req.query.o;
  if (_path.includes(rootPath.replace('/', '\\')))
    if(_options == 'download') res.download(_path, path.basename(_path));
  else render('filenotfound');
});
module.exports = router;
