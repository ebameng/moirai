var Model, Q, Record, Schema, mongoose, random, _;

require('../../../mongo.connection');

mongoose = require('mongoose');

random = require('random-js')();

Q = require('q');

_ = require('lodash');

Schema = new mongoose.Schema({
  "uid": {
    type: String,
    require: true,
    unique: true
  },
  "headUrl": {
    type: String,
    "default": ''
  },
  "sign": {
    type: String,
    "default": ''
  },
  "last_update_stamp": {
    type: Number,
    "default": 0
  }
});

Schema.index({
  last_update_stamp: 1,
  type: -1
});

Model = mongoose.model('User', Schema);

Record = (function() {
  function Record(data) {
    this.doc = new Model(data);
  }

  Record.prototype.save = function() {
    var def;
    def = Q.defer();
    this.doc.save(function(err, docs) {
      if (err) {
        return def.resolve({
          node_code: 44,
          msg: err['message'],
          err: err
        });
      }
      return def.resolve({
        node_code: 20000,
        data: docs,
        msg: 'ok'
      });
    });
    return def.promise;
  };

  return Record;

})();

Record.update = function(uid, data, opts) {
  var def;
  if (data == null) {
    data = {};
  }
  if (opts == null) {
    opts = {
      upsert: true,
      multi: false
    };
  }
  def = Q.defer();
  Model.update({
    uid: uid
  }, data, opts, function(err, numberAffected, raw) {
    if (err) {
      return def.resolve({
        node_code: err['code'],
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: {
        numberAffected: numberAffected,
        raw: raw
      },
      msg: 'ok'
    });
  });
  return def.promise;
};

Record.getArray = function(limit, condition) {
  var def;
  if (limit == null) {
    limit = 20;
  }
  if (condition == null) {
    condition = {
      last_update_stamp: 0
    };
  }
  def = Q.defer();
  Model.find(condition).exec(function(err, docs) {
    if (err) {
      return def.resolve({
        node_code: 44,
        data: null,
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: docs,
      msg: 'ok'
    });
  });
  return def.promise;
};

Record.getRandomArray = function(capacity, condition) {
  var def, defers;
  if (capacity == null) {
    capacity = 20;
  }
  if (condition == null) {
    condition = {
      last_update_stamp: 0
    };
  }
  def = Q.defer();
  defers = [];
  Record.count(condition).done(function(rs) {
    var count, i;
    if (rs['node_code'] !== 20000) {
      return def.resolve(rs);
    }
    count = rs['data'];
    i = 0;
    while (i < capacity) {
      i++;
      defers.push(Record.findRandomOne(condition, count));
    }
    return Q.all(defers).done(function(rs) {
      var arr, item, _i, _len;
      arr = [];
      for (_i = 0, _len = rs.length; _i < _len; _i++) {
        item = rs[_i];
        if (item['node_code'] === 20000) {
          arr.push(item['data']);
        }
      }
      return def.resolve({
        node_code: 20000,
        data: arr
      });
    });
  });
  return def.promise;
};

Record.count = function(condition) {
  var def;
  if (condition == null) {
    condition = {};
  }
  def = Q.defer();
  Model.find(condition).count().exec(function(err, rs) {
    if (err) {
      return def.resolve({
        node_code: 44,
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: rs,
      msg: 'ok'
    });
  });
  return def.promise;
};

Record.getAll = function() {
  var def;
  def = Q.defer();
  Model.find({}, {
    'uid': 1
  }).exec(function(err, docs) {
    if (err) {
      return def.resolve({
        node_code: 44,
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: docs
    });
  });
  return def.promise;
};

Record.findRandomOne = function(condition, count) {
  var def, skipNumber;
  if (condition == null) {
    condition = {};
  }
  if (count == null) {
    count = 1;
  }
  def = Q.defer();
  skipNumber = random.integer(0, count - 1);
  Model.findOne(condition).skip(skipNumber).limit(1).exec(function(err, doc) {
    if (err) {
      return def.resolve({
        node_code: 44,
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: doc
    });
  });
  return def.promise;
};

Record.findOne = function(condition) {
  var def;
  if (condition == null) {
    condition = {};
  }
  def = Q.defer();
  Model.findOne(condition).exec(function(err, doc) {
    if (err) {
      return def.resolve({
        node_code: 44,
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: doc
    });
  });
  return def.promise;
};

Record.removeUsers = function(arr) {
  var def;
  def = Q.defer();
  console.log('delerere', arr);
  Model.remove({
    'uid': {
      $in: arr
    }
  }).exec(function(err, doc) {
    if (err) {
      return def.resolve({
        node_code: 44,
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: doc
    });
  });
  return def.promise;
};

module.exports = Record;
