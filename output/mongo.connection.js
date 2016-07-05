var DBHOST, DBName, mongoose, uri;

mongoose = require("mongoose");

DBName = 'spider';

DBHOST = '127.0.0.1';

DBHOST = 'spider.591ku.com';

uri = "mongodb://" + DBHOST + "/" + DBName;

console.log(uri);

mongoose.connect(uri, {
  server: {
    poolSize: 12
  },
  user: 'alex',
  pass: 'alex',
  auth: {
    authdb: 'admin'
  }
});
