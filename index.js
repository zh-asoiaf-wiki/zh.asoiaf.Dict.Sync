var http = require('http');
var express = require('express');
var sync = require('./sync.js');

var app = express();
app.get('/dict', function(req, res) {
  console.log('/dict');
  res.download('./dict-all.json', 'dict.json', function(err) {
    if (err) {
      console.log(err);
    } else {
      sync(); // force sync() when /dict is requested
    }
  });
});
app.get('/dict/noen', function(req, res) {
  console.log('/dict/noen');
  res.download('./dict-all-noen.json', 'dict-noen.json', function(err) {
    if (err) {
      console.log(err);
    }
  });
});

var port = process.env.PORT || 7777;
var server = app.listen(port, function() {
  console.log('Server start...');
  //sync(); // sync the first time when server start up
  setInterval(call, process.env.SYNC_INTERVAL);
});

var call = function() {
  var option = {
    host: 'localhost', 
    port: port, 
    path: '/dict', 
    method: 'GET'
  };
  var req = http.request(option, function(res) {
    console.log('server-side request complete');
  });
  req.end();
  req.on('error', function(e) {
    console.error(e);
  });
};