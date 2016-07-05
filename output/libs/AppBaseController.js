var AppBaseController, ForeRunner, Gaze, config, express, mail, os, path, redis, renderer, _,
  __slice = [].slice;

path = require('path');

_ = require('lodash');

express = require('express');

Gaze = require('gaze');

os = require('./os');

config = require('../config');

renderer = require('./renderer');

redis = require('socket.io-redis');

mail = require('./mail');

ForeRunner = require('../routes/ForeRunner');

AppBaseController = (function() {
  function AppBaseController(options) {
    this.options = _.extend({
      mode: process.env.NODE_ENV,
      port: 8989,
      assets: []
    }, options);
    this.server = express();
    this._IO_Handlers = [];
    this._init();
  }

  AppBaseController.prototype._watch_browser_resource = function() {
    var gaze, target;
    target = config['watcher']['browser']['target'] || [];
    gaze = new Gaze(target, {
      mode: 'poll',
      debounceDelay: 1000
    });
    return gaze.on('all', (function(_this) {
      return function(action, file_name) {
        console.log(file_name, ' changed');
        return _this.io.emit('reload', action + file_name);
      };
    })(this));
  };

  AppBaseController.prototype._init = function() {
    this._init_default_static();
    return this._watch_browser_resource();
  };

  AppBaseController.prototype.addPipeRoutes = function() {
    var handlers, path;
    path = arguments[0], handlers = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.server.get(path, [ForeRunner].concat(handlers));
  };

  AppBaseController.prototype.addStatic = function(pattern, root) {
    return this._static(pattern, root);
  };

  AppBaseController.prototype._init_default_static = function() {
    var assets;
    assets = this.options['assets'];
    return assets.forEach((function(_this) {
      return function(item, index) {
        return _this.addStatic(item['pattern'], item['root']);
      };
    })(this));
  };

  AppBaseController.prototype.addSocketIOHandler = function(handler) {
    return this._IO_Handlers.push(handler);
  };

  AppBaseController.prototype._static = function(pattern, root) {
    if (!pattern) {
      throw Error('param pattern required!');
    }
    this.server.use(pattern, express["static"](root));
    return this.server.use(pattern, function(req, res, next) {
      var content_type, delay, ext, ext_from, ext_to, file_path_name, origin_coffee_file, origin_stylus_file;
      delay = req.query.delay || 0;
      ext = path.extname(req.path);
      file_path_name = req.path;
      switch (ext) {
        case '.js':
          ext_from = '.coffee';
          ext_to = '.js';
          content_type = 'application/javascript';
          origin_coffee_file = path.join(root, file_path_name).replace(ext_to, ext_from);
          return renderer.compile_coffee(origin_coffee_file, function(str) {
            console.log('memory ', origin_coffee_file);
            return res.send(str);
          });
        case '.css':
          ext_from = '.styl';
          ext_to = '.css';
          content_type = 'text/css';
          res.type(content_type);
          origin_stylus_file = path.join(root, file_path_name).replace(ext_to, ext_from);
          return renderer.compile_stylus(origin_stylus_file, function(str) {
            console.log('memory ', origin_stylus_file);
            return res.send(str);
          });
        default:
          next('Error file ' + file_path_name + ' not found');
      }
    });
  };

  AppBaseController.prototype.start = function(cb) {
    var SocketIOCookieParser, ih, io, port, server, _i, _len, _ref;
    if (cb == null) {
      cb = function() {};
    }
    server = (require('http')).Server(this.server);
    io = this.io = require('socket.io')(server);
    SocketIOCookieParser = require('socket.io-cookie');
    io.use(SocketIOCookieParser);
    if (GLOBAL_OBJECT['mode'] !== 'development') {
      console.log('redis connect');
      io.adapter(redis({
        host: '127.0.0.1',
        port: 6379
      }));
    }
    _ref = this._IO_Handlers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ih = _ref[_i];
      ih.call(io);
    }
    port = this.options['port'];
    return server.listen(port, (function(_this) {
      return function() {
        return cb.call(_this);
      };
    })(this));
  };

  return AppBaseController;

})();

module.exports = AppBaseController;
