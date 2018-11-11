var express = require('express');
var fs = require('fs');

var contents = fs.readFileSync('app.json', 'utf8');
var jsonObj = JSON.parse(contents);

var filePath = jsonObj.dirPath;
var fileName2 = jsonObj.fileName;
var fileSize = jsonObj.fileSize;

var router = express.Router();

function include(fileName, name)
{
  for(i = 0; i<fileName.length; i++)
  {
    if(fileName[i] === name) return true;
  }
  return false;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QuyComputer Download', fileName : fileName2, fileSize : fileSize });
});

router.get('/download/:id',(req, res) => {
  if(include(fileName2, req.params.id) == true) res.download(filePath+req.params.id, req.params.id);
  else res.render('filenotfound');
});
module.exports = router;
