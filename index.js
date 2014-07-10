var express = require("express");
var dict = require("zh.asoiaf.dict");

var app = express();
app.get('/dict', function(req, res) {
  console.log('in /dict');
  res.download('./dict-all.json', 'dict.json', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('get');
    }
  });
});

var server = app.listen(3000, function() {
  console.log('Server start...');
});