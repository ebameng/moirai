var APP, Admin, AppBaseController, AppLunch, Atlas, AtlasChat, Broadcast, ForeRunner, IOHandlerFromPinsta, Index, Label, MyAtlas, Notification, Order, Pagelet, PassportCheck, Permission, Recommend, Spider, Stickers, Test, UploadMedia, User, api, app, argv, bodyParser, config, cookieParser, express, fs, get_static_md5_content, mkdirp, session, template, utils, _, _Bridge, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_, _FN_ENSURE_CONTEXT_,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('./global');

config = require('./config');

_FN_ENSURE_CONTEXT_ = function(options) {
  var _CONST_MODE_;
  if (options == null) {
    options = {};
  }
  GLOBAL_OBJECT['mode'] = _CONST_MODE_ = options['mode'] || process.env['NODE_ENV'];
  GLOBAL_OBJECT['_CONST_LOCAL_SERVER_PORT_'] = options['local_server_port'] || (_CONST_MODE_ === 'development' ? config['dev_port'] : config['pro_port']);
  GLOBAL_OBJECT['_CONST_REMOTE_SERVER_DOMAIN_'] = options['remote_server_name'] || (_CONST_MODE_ === 'development' ? config['dev_remote_server_name'] : config['pro_remote_server_name']);
  return GLOBAL_OBJECT['_CONST_REMOTE_SERVER_NAME_'] = options['remote_server_name'] || (_CONST_MODE_ === 'development' ? config['dev_remote_server_name'] : config['pro_remote_server_ip'] || config['pro_remote_server_name']);
};

argv = require('optimist').argv;

_FN_ENSURE_CONTEXT_({
  mode: argv['mode'],
  local_server_port: argv['port'],
  remote_server_name: argv['api']
});

AppBaseController = require('./libs/AppBaseController');

Pagelet = require('./libs/pagelet');

api = require('./libs/api');

utils = require('./libs/utils');

Test = require('./routes/Test');

_Bridge = require('./routes/_Bridge');

Index = require('./routes/Index');

Label = require('./routes/Label');

Atlas = require('./routes/Atlas');

MyAtlas = require('./routes/MyAtlas');

User = require('./routes/User');

UploadMedia = require('./routes/UploadMedia');

Admin = require('./routes/Admin');

Permission = require('./routes/Permission');

Broadcast = require('./routes/Broadcast');

AtlasChat = require('./routes/AtlasChat');

ForeRunner = require('./routes/ForeRunner');

PassportCheck = require('./routes/PassportCheck');

Order = require('./routes/Order');

AppLunch = require('./routes/AppLunch');

Recommend = require('./routes/Recommend');

Stickers = require('./routes/Stickers');

Notification = require('./routes/Notification');

Spider = require('./routes/Spider');

template = require('evertpl');

fs = require('fs');

bodyParser = require('body-parser');

cookieParser = require('cookie-parser');

session = require('cookie-session');

mkdirp = require('mkdirp');

express = require('express');

_ = require('lodash');

IOHandlerFromPinsta = require('./handler/pinsta');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

mkdirp.sync('__temp_upload__');

get_static_md5_content = function() {
  var e, md5_map_content;
  md5_map_content = '{}';
  try {
    md5_map_content = fs.readFileSync('./static/js/md5_map.json');
  } catch (_error) {
    e = _error;
    console.log('md5 will be read on production mode');
  }
  return md5_map_content;
};

APP = (function(_super) {
  __extends(APP, _super);

  function APP(options) {
    template.config({
      src: './views',
      env: GLOBAL_OBJECT['mode'],
      local: {
        mode: GLOBAL_OBJECT['mode'],
        api_domain: GLOBAL_OBJECT['_CONST_REMOTE_SERVER_DOMAIN_'],
        static_cdn: GLOBAL_OBJECT['_CONST_QINIU_STATIC_CDN_'],
        md5_map_content: get_static_md5_content()
      }
    });
    template.helper('whenHappend', utils.whenHappend);
    template.helper('timeFormat', utils.timeFormat);
    template.helper('dateFormat', utils.dateFormat);
    APP.__super__.constructor.call(this, options);
  }

  return APP;

})(AppBaseController);

app = new APP({
  port: GLOBAL_OBJECT['_CONST_LOCAL_SERVER_PORT_'],
  mode: GLOBAL_OBJECT['mode'],
  assets: [
    {
      pattern: '/static',
      root: './static'
    }, {
      pattern: '/resource',
      root: './__temp_upload__'
    }, {
      pattern: '/favicon.ico',
      root: './static/img/icons/logo.png'
    }
  ]
});

app.server.disable('x-powered-by');

app.server.use(bodyParser.urlencoded({
  extended: false
}));

app.server.use(bodyParser.json());

app.server.use(cookieParser());

app.server.use(session({
  name: 'NYUSS',
  keys: ['xipu'],
  secret: 'you never get the secret'
}));

app.server.all('/*', function(req, res, next) {
  var startTime;
  startTime = new Date;
  console.log(startTime, req.path, ' arrive', 'METHOD', req.method);
  res.on('finish', function(e) {
    var endTime;
    endTime = new Date;
    return console.log(endTime, req.path, ' depart ', (endTime - startTime) + 'ms RTT');
  });
  return next();
});

app.server.get('/login', function(req, res, next) {
  var html;
  html = template.renderFile('page/login/index.html', {});
  return res.send(html);
});

app.server.get('/logout', function(req, res) {
  var code, html;
  code = req.query['code'] || 'logout';
  html = template.renderFile('page/login/index.html', {});
  res.clearCookie('XPUSS');
  return res.redirect("/login?code=" + code);
});

app.server.get('/atlas/:id/detail', Atlas.detail);

app.server.get('/t', Spider.tplus);

app.server.get('/spider/download/users', Spider.download);

app.server.get('/test/', Test.resource);

app.addPipeRoutes(['/', '/home', '/index'], Index);

app.addPipeRoutes('/atlas/list', Atlas.list);

app.addPipeRoutes('/atlas/list/top', Atlas.top);

app.addPipeRoutes('/atlas/publish', Atlas.publish);

app.addPipeRoutes('/my/atlas/list', MyAtlas.list);

app.addPipeRoutes('/my/atlas/list/timming', MyAtlas.timming);

app.addPipeRoutes('/admin/broadcast', Broadcast.ui);

app.addPipeRoutes('/admin/permission', Permission.ui);

app.addPipeRoutes('/user/list', User.list);

app.addPipeRoutes('/user/list/active', User.active);

app.addPipeRoutes('/user/atlas/list', User.atlasList);

app.addPipeRoutes('/user/recmd/list', Recommend.list);

app.addPipeRoutes('/user/search', User.search);

app.addPipeRoutes('/admin/list', Admin.list);

app.addPipeRoutes('/admin/publish', Admin.publish);

app.addPipeRoutes('/admin/alloc/role', Admin.allocRole);

app.addPipeRoutes('/admin/ones/role', Admin.onesRole);

app.addPipeRoutes('/label/list', Label.list);

app.addPipeRoutes('/label/publish', Label.publish);

app.addPipeRoutes('/label/search', Label.search);

app.addPipeRoutes('/label/brand/list', Label.brandList);

app.addPipeRoutes('/stickers/publish', Stickers.publish);

app.addPipeRoutes('/stickers/list', Stickers.list);

app.addPipeRoutes('/stickers/type/list', Stickers.typeList);

app.addPipeRoutes('/stickers/detail/list', Stickers.detailList);

app.addPipeRoutes('/applunch/publish', AppLunch.publish);

app.addPipeRoutes('/admin/notification/publish', Notification.publish);

app.addPipeRoutes('/admin/notification/list', Notification.list);

app.addPipeRoutes('/admin/notification/timer/list', Notification.timerlist);

app.addPipeRoutes('/test/layout', Test.layout);

app.addPipeRoutes('/test/view', Test.view);

app.addPipeRoutes('/test/load', Test.load);

app.server.post('/notification/create', Notification.create);

app.server.post('/notification/updateimg', Notification.updateImage);

app.server.post('/sticker/type/add', Stickers.createType);

app.server.post('/stickers/create', Stickers.create);

app.server.post('/stickers/type/update', Stickers.updateType);

app.server.post('/stickers/update', Stickers.update);

app.server.post('/label/create', Label.create);

app.server.post('/label/updateimg', Label.updateImage);

app.server.post('/passport/check', PassportCheck);

app.server.post('/upload/media', UploadMedia);

app.server.post('/admin/create', Admin.create);

app.server.post('/admin/update/portrait', Admin.updateHeadImage);

AtlasChat(app.server);

_Bridge(app.server);

app.addSocketIOHandler(IOHandlerFromPinsta);

app.server.use(function(req, res, next) {
  var html, pagelet;
  console.log('4xx');
  if (req.query['__pipe__']) {
    pagelet = new Pagelet({
      template: 'page/sorry/404.html'
    });
    return pagelet.pipe(res);
  }
  html = template.renderFile('page/sorry/404.html', {});
  return res.send(html);
});

app.server.use(function(err, req, res, next) {
  var html;
  console.log(err);
  html = template.renderFile('page/sorry/5xx.html', {});
  return res.send(html);
});

app.start(function() {
  console.log(this.options);
  return console.log('global: ', GLOBAL_OBJECT);
});
