var P_NUM, cluster, i, mail, worker, _i;

cluster = require('cluster');

mail = require('./libs/mail');

P_NUM = require('os').cpus().length - 1;

cluster.setupMaster({
  exec: "./app.js"
});

for (i = _i = 0; _i < 1; i = _i += 1) {
  console.log(cluster.isMaster, ' master');
  console.log(worker);
  worker = cluster.fork();
}

cluster.on('exit', function(worker, code, signal) {
  cluster.fork();
  mail({
    subject: "code=" + code + " signal=" + signal
  });
});

process.on('message', function(e) {
  return console.log('master get message ');
});
