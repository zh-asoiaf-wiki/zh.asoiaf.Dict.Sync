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

var lastDict = {}; // dict object get last time
var sync = function() {
  dict.getAll(function(res) {
    var toPush = false;
    for (var item in res.dict) {
      if (res.dict[item] == lastDict[item]) {
        lastDict[item] = undefined;
      } else {
        console.log('NEW record found: ' + item + ' => ' + res.dict[item]);
        toPush = true;
        break;
      }
    }
    if (!toPush) {
      for (var item in lastDict) {
        if (lastDict[item]) {
          console.log('OLD record deleted: ' + item + ' => ' + lastDict[item]);
          toPush = true;
          break;
        }
      }
    }
    if (toPush) {
      dict.push('MediaWiki:Common.js/dict');
      dict.pushZhEn('Template:zh-en');
      dict.pushEnZh('Template:en-zh');
    }
    lastDict = res.dict;
    console.log('dict sync: ' + ((toPush) ? 'UPDATE' : 'NO CHANGE'));
  });
};

module.exports = sync;