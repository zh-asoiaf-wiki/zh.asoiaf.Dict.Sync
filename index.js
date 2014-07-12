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

var lastDict = {}; // dict object get last time
var sync = function() {
  dict.getAll(function(res) {
    var toPush = false;
    for (var item in res.dict) {
      if (res.dict[item] == lastDict[item]) {
        lastDict[item] = undefined;
      } else {
        console.log('NEW record found: ' + item);
        toPush = true;
        break;
      }
    }
    if (!toPush) {
      for (var item in lastDict) {
        if (lastDict[item]) {
          console.log('OLD record deleted: ' + item);
          toPush = true;
          break;
        }
      }
    }
    if (toPush) {
      dict.push('冰与火之歌:Dict');
    }
    lastDict = res.dict;
    console.log('dict sync: ' + ((toPush) ? 'UPDATE' : 'NO CHANGE'));
  });
};