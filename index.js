var express = require("express");
var Dict = require("zh.asoiaf.dict");
var dict = new Dict({
  config: 'dict_config.js'
});

var app = express();
app.get('/dict', function(req, res) {
  console.log('/dict');
  res.download('./dict-all.json', 'dict.json', function(err) {
    if (err) {
      console.log(err);
    } else {
      setTimeout(sync, 10000); // when dict is downloaded, sync dict 15 min later
    }
  });
});

var server = app.listen(80, function() {
  console.log('Server start...');
  
  setInterval(sync, 30000); // sync dict every 1 hour
});

var sync = function() {
  dict.getAll();
  console.log('dict sync.');
};