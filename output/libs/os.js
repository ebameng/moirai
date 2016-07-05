var Q, child_process, fs, query, spawn, which, _;

Q = require('q');

_ = require('lodash');

fs = require('fs');

which = require('which');

child_process = require('child_process');

spawn = function(cmd, args, options) {
  var deferred, opts, ps, win_cmd;
  if (args == null) {
    args = [];
  }
  if (options == null) {
    options = {};
  }
  deferred = Q.defer();
  opts = _.extend({
    stdio: 'inherit'
  }, options);
  if (process.platform === 'win32') {
    win_cmd = cmd + '.cmd';
    if (fs.existsSync(win_cmd)) {
      cmd = win_cmd;
    } else if (!fs.existsSync(cmd)) {
      cmd = which.sync(cmd);
    }
  }
  ps = child_process.spawn(cmd, args, opts);
  ps.on('error', function(data) {
    return deferred.reject(data);
  });
  ps.on('data', function(data) {
    return deferred.notify(data);
  });
  ps.on('close', function(code) {
    if (code === 0) {
      return deferred.resolve(code);
    } else {
      return deferred.reject(code);
    }
  });
  deferred.promise.process = ps;
  return deferred.promise;
};

query = function(cmd, file) {
  return child_process.spawn('ps', function(err, stdout, stdio) {
    return console.log(err, stdout, stdio);
  });
};

module.exports = {
  spawn: spawn,
  query: query
};
