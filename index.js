var express = require("express");
var Dict = require("zh.asoiaf.dict");
var dict = new Dict({
  config: {
    "server": "zh.asoiaf.wikia.com", 
    "path": "", 
    "username": process.env.BOT_USERNAME, 
    "password": process.env.BOT_PASSWORD, 
    "userAgent": "zh.asoiaf.Dict", 
    "debug": true  
  }
});

var app = express();
app.get('/dict', function(req, res) {
  console.log('/dict');
  res.download('./dict-all.json', 'dict.json', function(err) {
    if (err) {
      console.log(err);
    } else {
      setTimeout(sync, 900000); // when dict is downloaded, sync dict 15 min later
    }
  });
});

var port = process.env.PORT || 7777;
var server = app.listen(port, function() {
  console.log('Server start...');
  
  setInterval(sync, 3600000); // sync dict every 1 hour
});

var sync = function() {
  dict.getAll();
  console.log('dict sync.');
};