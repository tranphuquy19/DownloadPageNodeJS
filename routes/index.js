var express = require('express');
var fs = require('fs');
var fsize = require('filesize');
var path = require('path');
var crypto = require('crypto');

var contents = fs.readFileSync('app.json', 'utf8');

var jsonObj = JSON.parse(contents);

var rootPath = jsonObj.dirPath;
var pageViews = jsonObj.views;
var pageDownloads = jsonObj.downloads;

var router = express.Router();

function hashPath(path) {
  return crypto.createHash('md5').update(path).digest('hex');
}

function splitNum(x) {
  var count = 0;
  var digits = ("" + x).split("").reverse();
  var str = "";
  digits.forEach(num => {
    if (count % 3 != 0 || count == 0) {
      str += digits[count];
    } else {
      str += "," + digits[count];
    }
    count++;
  });
  return str.split("").reverse().join("")
}

function initFiles(path, pageViews, pageDownloads) {
  var _files = [];

  fs.readdirSync(path).forEach(file => {
    var _file = new Object();
    var __dirPath = path + '/' + file;

    var dir = fs.lstatSync(__dirPath);

    _file.name = file;
    _file.path = __dirPath;
    _file.type = dir.isDirectory();
    _file.hash = hashPath(__dirPath);

    if (!_file.type) {
      const rarFileBytes = fs.statSync(__dirPath);
      _file.size = fsize(rarFileBytes.size, { round: 0 });
    } else {
      _file.size = '';
    }
    _files.push(_file);
  });
  _files.views = pageViews;
  _files.downloads = pageDownloads;
  return _files;
}

function renderHomepage(res, _path) {
  //Update root path

  contents = fs.readFileSync('app.json', 'utf8');

  jsonObj = JSON.parse(contents);
  pageViews = splitNum(jsonObj.views);
  pageDownloads = splitNum(jsonObj.downloads);

  rootPath = jsonObj.dirPath;
  var __files = initFiles(_path, pageViews, pageDownloads);
  res.render('index', { title: 'Doraneko', files: __files });
}

function countViews() {
  jsonObj.views++;
  var end = JSON.stringify(jsonObj);
  fs.writeFileSync('app.json', end, 'utf8');
}

function countDownloads() {
  jsonObj.downloads++;
  var end = JSON.stringify(jsonObj);
  fs.writeFileSync('app.json', end, 'utf8');
}

/* GET home page. */
router.get('/browser', function (req, res, next) {
  countViews();
  var _path;
  if (req.query.p == null) _path = rootPath;
  else _path = req.query.p;
  if (_path.includes(rootPath.replace('^', '/')))
    renderHomepage(res, _path);
  else res.render('filenotfound');
});

router.get('/', function (req, res, next) {
  res.redirect('/browser');
});

router.get('/download', (req, res) => {
  // if (include(fileName2, req.params.id) == true) res.download(filePath + req.params.id, req.params.id);
  // else res.render('filenotfound');
  //console.log(req.params.id);
  //console.log("path is: " + req.query.p + "," + rootPath);
  countDownloads();
  var _path = req.query.p;
  console.log(_path);
  var _options = req.query.o;
  if (_path.includes(rootPath))
    if (_options == 'download') res.download(_path, path.basename(_path));
    else res.render('filenotfound');
});
module.exports = router;
