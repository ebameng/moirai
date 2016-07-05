var Pagelet, Q, api, cheerio, ejs, fs, group, keepInline, path, showBreaker, template, uid, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_, _const_chunk_end_template, _const_chunk_in_template, _const_chunk_start_template, _const_error_template;

fs = require('fs');

path = require('path');

cheerio = require('cheerio');

ejs = require('ejs');

template = require('evertpl');

_ = require('lodash');

api = require('../api');

Q = require('q');

uid = require('uid');

_CONST_REMOTE_STATUS_CODE_ = global['GLOBAL_OBJECT']['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = global['GLOBAL_OBJECT']['_CONST_NODE_ERROR_CODE_'];

group = function() {
  var pageletList;
  return pageletList = [].apply.call([], arguments);
};

keepInline = function(str) {
  return str.replace(/[\r\n\t\u2028\u2029]/g, ' ');
};

_const_error_template = fs.readFileSync('libs/pagelet/tmpl/error.html', 'utf8');

_const_chunk_start_template = keepInline(fs.readFileSync('libs/pagelet/tmpl/chunk_start.html', 'utf8'));

_const_chunk_in_template = keepInline(fs.readFileSync('libs/pagelet/tmpl/chunk_in.html', 'utf8'));

_const_chunk_end_template = keepInline(fs.readFileSync('libs/pagelet/tmpl/chunk_end.html', 'utf8'));

showBreaker = function(str) {
  var map;
  map = {
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\u2028': '\\u8',
    '\u2029': '\\u9'
  };
  return str.replace(/[\r\t\n\u2028\u2029]/g, function(matcher, index) {
    return map[matcher];
  });
};

Pagelet = (function() {
  var cssSelector, jsSelector;

  cssSelector = 'link[href]';

  jsSelector = 'script';

  function Pagelet(res, opts) {
    this.res = res;
    this.options = _.extend({
      selector: '.center',
      sid: '',
      template: '',
      autoEnd: true,
      op: 'html',
      data: {},
      errorData: {
        node_code: 'SORRY',
        msg: 'ACCESS UNAVAILABLE'
      },
      format: function(rs) {
        return rs;
      }
    }, opts);
    this._css_ = [];
    this._js_ = [];
    this._inline_js_text_ = [];
    this._html_ = '';
    this.__cfID__ = res.req['query']['cfID'] || +(new Date);
    this.__children_ids__ = [];
    this.__parentID__ = '';
    this.__pipeID__ = 'pipe_' + uid(32);
    this.count = 1;
  }

  Pagelet.prototype._render = function(data) {
    var html;
    html = template.renderFile(this.options['template'], data);
    return html;
  };

  Pagelet.prototype.appendChildWithID = function(id) {
    return this.__children_ids__.push(id);
  };

  Pagelet.prototype._getRemoteData = function(callback) {
    var _that;
    _that = this;
    return api.request(this.options['request']).done(function(rs) {
      return callback.call(_that, rs);
    });
  };

  Pagelet.prototype._getCSSResouceList = function() {
    var cssNodes;
    cssNodes = this.$(cssSelector);
    return cssNodes.each((function(_this) {
      return function(index, node) {
        return _this._css_.push(node['attribs']['href']);
      };
    })(this));
  };

  Pagelet.prototype._getJSResouceList = function() {
    var jsNodes;
    jsNodes = this.$(jsSelector);
    return jsNodes.each((function(_this) {
      return function(index, node) {
        if (node['attribs']['src']) {
          return _this._js_.push(node['attribs']['src']);
        } else {
          if (node.children && node.children[0]['data']) {
            return _this._inline_js_text_.push(node.children[0]['data']);
          }
        }
      };
    })(this));
  };

  Pagelet.prototype._getHTMLString = function() {
    this.$([cssSelector, jsSelector].join(',')).remove();
    return this._html_ = this.$.html();
  };

  Pagelet.prototype._analyze = function() {
    var data;
    this._getCSSResouceList();
    this._getJSResouceList();
    this._getHTMLString();
    data = {
      __cfID__: this.__cfID__,
      __pipeID__: this.__pipeID__,
      __parentID__: this.__parentID__,
      children: this.__children_ids__.join('-'),
      selector: this.options['selector'],
      op: this.options['op'],
      css: this._css_.length > 0 ? "['" + this._css_.join("','") + "']" : '[]',
      js: this._js_.length > 0 ? "['" + this._js_.join("','") + "']" : '[]',
      inline_js_text: this._inline_js_text_,
      html: keepInline(this._html_)
    };
    return data;
  };

  Pagelet.prototype.input = function(source) {
    return this.$ = cheerio.load(source);
  };

  Pagelet.prototype.output = function() {
    var hcj, html;
    hcj = this._analyze();
    html = ejs.render(_const_chunk_in_template, hcj);
    return keepInline(html);
  };

  Pagelet.prototype.pipeError = function(data) {
    var def, html, resObj, source;
    def = Q.defer();
    data = _.extend(this.options['errorData'], data);
    source = ejs.render(_const_error_template, data);
    resObj = {
      __cfID__: this.__cfID__,
      selector: this.options['selector'],
      op: this.options['op'],
      css: '[]',
      js: '[]',
      inline_js_text: '',
      html: keepInline(source)
    };
    html = ejs.render(_const_chunk_in_template, resObj);
    res.write(html);
    this.res.end();
    def.resolve();
    return def.promise;
  };

  Pagelet.prototype.getResponse = function() {
    return this.res;
  };

  Pagelet.prototype._getPipeState = function() {
    return this.res['_pipe_state_'] || 'CHUNK_START';
  };

  Pagelet.prototype._setPipeState = function(state) {
    return this.res['_pipe_state_'] = state;
  };

  Pagelet.prototype._doStartPipe = function() {
    var html, res;
    res = this.res;
    html = ejs.render(_const_chunk_start_template, {
      __cfID__: this.__cfID__,
      count: this.count
    });
    res.write(html);
    return this._setPipeState('CHUNK_IN');
  };

  Pagelet.prototype._doEndPipe = function() {
    var html, res;
    res = this.res;
    html = ejs.render(_const_chunk_end_template, {
      __cfID__: this.__cfID__
    });
    res.write(html);
    res.end();
    return this._setPipeState('CHUNK_END');
  };

  Pagelet.prototype.setSiblingsCount = function(count) {
    return this.count = count;
  };

  Pagelet.prototype.pipe = function() {
    var autoEnd, data, def, res, source, _that;
    res = this.res;
    autoEnd = this.options['autoEnd'];
    def = Q.defer();
    if (this._getPipeState(res) === 'CHUNK_START') {
      this._doStartPipe(res);
    }
    _that = this;
    if (!this.options.request) {
      data = this.options['data'];
      source = this._render(data);
      this.input(source);
      res.write(this.output());
      _that._setPipeState('CHUNK_IN');
      if (autoEnd) {
        this._doEndPipe();
      }
      def.resolve();
    } else {
      this._getRemoteData(function(rs) {
        if (rs['node_code'] === _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
          data = _that.options.format(rs);
          source = _that._render(data);
          _that.input(source);
          res.write(_that.output());
          _that._setPipeState(res, 'CHUNK_IN');
          if (autoEnd) {
            this._doEndPipe(res);
            _that._setPipeState(res, 'CHUNK_IN');
          }
        } else {
          _that.pipeError(res, {
            node_code: rs['node_code'],
            msg: rs['msg'] || ''
          });
        }
        return def.resolve();
      });
    }
    return def.promise;
  };

  Pagelet.prototype.end = function() {
    return this._doEndPipe();
  };

  return Pagelet;

})();

module.exports = Pagelet;
