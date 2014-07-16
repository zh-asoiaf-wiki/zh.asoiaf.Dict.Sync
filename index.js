var sync = require('./sync.js');
setInterval(sync, process.env.SYNC_INTERVAL);