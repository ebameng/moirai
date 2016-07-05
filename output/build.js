var Builder, Copy, FN, Glob, GlobAll, Q, builder, coffee, config, everTplCache, fisConf, fisOutput, fisWorkDir, fs, fse, glob, mapResource, md5_map_file, mkdirp, os, output, path, renderer, _, _compileCoffee, _compileSylus, _doFISCompile;

require('colors');

mkdirp = require('mkdirp');

_ = require('lodash');

glob = require('glob');

renderer = require('./libs/renderer');

Q = require('q');

coffee = require('coffee-script');

path = require('path');

FN = require('evertpl-fn');

Glob = Q.denodeify(glob);

os = require('./libs/os');

fs = require('fs');

fse = require('fs-extra');

config = require('./config');

output = './output';

fisWorkDir = './__fis_work__';

fisOutput = './' + +(new Date);

fisConf = './fis-conf.js';

md5_map_file = 'md5_map.json';

everTplCache = './__cache__';

mapResource = function(src, dist) {
  var def, k, map, res, v, _ref;
  def = Q.defer();
  res = require("./" + src);
  console.log(src);
  map = {};
  _ref = res['res'];
  for (k in _ref) {
    v = _ref[k];
    map[k] = v['uri'];
  }
  fse.outputJson(dist, map, function(err) {
    return def.resolve(err);
  });
  return def.promise;
};

Copy = function(src, dist) {
  var def;
  def = Q.defer();
  fse.copy(src, dist, function(code) {
    def.notify({
      src: src,
      dist: dist
    });
    return def.resolve(code);
  });
  return def.promise;
};

GlobAll = function() {
  var count, def, len, list, patterns;
  patterns = [].concat.apply([], arguments);
  def = Q.defer();
  len = patterns.length;
  count = 0;
  list = [];
  Q.all(_.map(patterns, function(pattern, index) {
    return Glob(pattern);
  })).done(function(rs) {
    rs = _.flatten(rs);
    return def.resolve(rs);
  });
  return def.promise;
};

_compileCoffee = function(src_file, dist_file) {
  var def;
  def = Q.defer();
  renderer.compile_coffee(src_file, function(rs) {
    return mkdirp(path.dirname(dist_file), function() {
      return fs.writeFile(dist_file, rs, function(err) {
        def.notify({
          src: src_file,
          dist: dist_file
        });
        return def.resolve({
          src: src_file,
          dist: dist_file
        });
      });
    });
  });
  return def.promise;
};

_compileSylus = function(src_file, dist_file) {
  var def;
  def = Q.defer();
  renderer.compile_stylus(src_file, function(rs) {
    return mkdirp(path.dirname(dist_file), function() {
      return fs.writeFile(dist_file, rs, function(err) {
        def.notify({
          src: src_file,
          dist: dist_file
        });
        return def.resolve({
          src: src_file,
          dist: dist_file
        });
      });
    });
  });
  return def.promise;
};

_doFISCompile = function() {
  var def;
  def = Q.defer();
  fse.copySync("" + output + "/views", "" + fisWorkDir + "/views");
  fse.copySync("" + output + "/static", "" + fisWorkDir + "/static");
  fse.copySync("" + output + "/config.js", "" + fisWorkDir + "/config.js");
  fse.copySync(fisConf, "" + fisWorkDir + "/" + fisConf);
  os.spawn('fis', ['release', '-om', '--dest', fisOutput, '--domains'], {
    cwd: fisWorkDir
  }).done(function(rs) {
    return def.resolve({
      data: rs,
      dir: fisOutput
    });
  });
  return def.promise;
};

Builder = (function() {
  function Builder(options) {
    this.options = _.extend({
      copy: ['views', 'libs/pagelet/tmpl', 'static/**/*.css', 'static/**/*.js', 'static/img/*', 'extend/*', 'static/plugins/*', 'Cakefile', 'forever.sh'],
      coffee: {
        ext: 'js',
        src: ['libs/**/*.coffee', 'extend/**/*.coffee', 'model/**/*.coffee', 'routes/**/*.coffee', 'handler/**/*.coffee', '*.coffee', 'static/**/*.coffee']
      },
      stylus: {
        ext: 'css',
        src: ['static/**/*.styl']
      },
      postProcess: {
        md5: {
          src: ['static']
        }
      }
    }, options);
    this.init();
  }

  Builder.prototype.init = function() {
    return console.log('task start'.yellow);
  };

  Builder.prototype.cleanDirectory = function() {
    fse.removeSync(output);
    fse.removeSync(fisWorkDir);
    return console.log([output, fisWorkDir].join(', '), ' removed'.red);
  };

  Builder.prototype.makeDirectory = function() {
    fse.ensureDirSync(output);
    fse.ensureDirSync(fisWorkDir);
    return console.log([output, fisWorkDir].join(', '), ' created '.green);
  };

  Builder.prototype.compileTemplate = function() {
    var def, dir, fn;
    dir = everTplCache;
    fse.removeSync(dir);
    def = Q.defer();
    fn = new FN({
      onMessage: function(type, msgObj) {
        process.stdout.write('.');
        if (type === 'finish') {
          return console.log('\n', msgObj['ignored'].join(','), ' ignored');
        }
      },
      src: path.join(fisWorkDir, fisOutput, "views"),
      selector: '**/*.html',
      dist: dir
    });
    fn.run();
    def.resolve();
    return def.promise;
  };

  Builder.prototype.copy = function() {
    var def, targets, _that;
    targets = _.flatten(this.options['copy']);
    _that = this;
    def = Q.defer();
    GlobAll(targets).done(function(files) {
      return Q.all(_.map(files, function(file, index) {
        return Copy(file, path.join(output, file)).progress(function() {
          return process.stdout.write('.');
        });
      })).done(function(rs) {
        return def.resolve(rs);
      });
    });
    return def.promise;
  };

  Builder.prototype.compileCoffee = function() {
    var def, ext, src, _that;
    _that = this;
    src = this.options['coffee']['src'];
    ext = this.options['coffee']['ext'];
    def = Q.defer();
    GlobAll(src).done(function(files) {
      return Q.all(_.map(files, function(file, index) {
        var outFile;
        outFile = path.join(output, file);
        outFile = outFile.replace(/coffee$/, ext);
        return _compileCoffee(file, outFile).progress(function(rs) {
          return process.stdout.write('.');
        });
      })).done(function(rs) {
        return def.resolve(rs);
      });
    });
    return def.promise;
  };

  Builder.prototype.compileStylus = function() {
    var def, ext, src, _that;
    _that = this;
    src = this.options['stylus']['src'];
    ext = this.options['stylus']['ext'];
    def = Q.defer();
    GlobAll(src).done(function(files) {
      return Q.all(_.map(files, function(file, index) {
        var outFile;
        outFile = path.join(output, file);
        outFile = outFile.replace(/styl$/, ext);
        return _compileSylus(file, outFile).progress(function(rs) {
          return process.stdout.write('.');
        });
      })).done(function(rs) {
        return def.resolve(rs);
      });
    });
    return def.promise;
  };

  Builder.prototype.run = function() {
    var _that;
    _that = this;
    this.cleanDirectory();
    this.makeDirectory();
    return Q.fcall(function() {
      return console.log('all task'.green);
    }).then(function() {
      console.log('compile coffee'.yellow);
      return _that.compileCoffee();
    }).then(function() {
      console.log('\n');
      console.log('compile stylus'.yellow);
      return _that.compileStylus();
    }).then(function() {
      console.log('\n');
      console.log('copy origins( config views ...)'.yellow);
      return _that.copy();
    }).then(function(rs) {
      console.log('\n');
      console.log('baidu-fis come '.yellow);
      return _doFISCompile();
    }).then(function(rs) {
      console.log('\n');
      console.log('compile template to javascript function '.yellow);
      return _that.compileTemplate();
    }).then(function() {
      console.log('\n');
      return mapResource(path.join("" + fisWorkDir, "" + fisOutput, "map.json"), path.join(output, "static", "js", md5_map_file));
    }).done(function() {
      fse.copySync(everTplCache, path.join(output, everTplCache));
      return fse.copySync("" + fisWorkDir + "/" + fisOutput + "/static", path.join(output, "static"));
    });
  };

  return Builder;

})();

builder = new Builder;

builder.run();
