var Q, compile_coffee, compile_stylus, fs, get_content, _, _storeCache;

fs = require('fs');

Q = require('q');

_ = require('lodash');

_storeCache = {};

get_content = function(path, cache) {
  var def;
  def = Q.defer();
  if (cache) {
    if (_storeCache[path]) {
      def.resolve(_storeCache[path]);
    }
  } else {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        return def.resolve({
          status: false,
          err: err,
          msg: err.message
        });
      }
      def.resolve({
        status: true,
        data: data
      });
      return _storeCache[path] = data;
    });
  }
  return def.promise;
};

compile_coffee = function(path, done) {
  var coffee;
  if (!typeof done === 'function') {
    throw Error('cb function is required');
  }
  coffee = require('coffee-script');
  return get_content(path).then(function(rs) {
    var code, e, str;
    code = rs['data'];
    if (!rs['status']) {
      return done(rs['err']);
    }
    try {
      str = coffee.compile(code, {
        bare: true
      });
    } catch (_error) {
      e = _error;
      done('coffee syntax error\n' + e);
    }
    return done(str);
  });
};

compile_stylus = function(path, done, option) {
  var stylus;
  if (!typeof done === 'function') {
    throw Error('cb function is required');
  }
  stylus = require('stylus');
  return get_content(path).then(function(rs) {
    var code, errCSS;
    errCSS = "body{position: relative;}\nbody::after{content: '{warn>> stylus err, see your NODE CONSOLE}'; z-index: 99999; position:absolute; left: 0; top: 0; right: 0; padding: 8px;background: red; color: #fff}";
    code = rs['data'];
    if (!rs['status']) {
      console.log(rs['err']);
      return done(errCSS);
    }
    return stylus(code).set('filename', path).render(function(err, str) {
      if (err) {
        console.log(err);
        done(errCSS);
        return;
      }
      return done(str);
    });
  });
};

module.exports = {
  get_content: get_content,
  compile_coffee: compile_coffee,
  compile_stylus: compile_stylus
};
