var Model, ObjectId, Q, Record, Schema, mongoose, _;

require('../../../mongo.connection');

mongoose = require('mongoose');

Q = require('q');

_ = require('lodash');

ObjectId = mongoose.Schema.ObjectId;

Schema = new mongoose.Schema({
  "is_read": {
    type: Boolean,
    "default": false
  },
  "DBID": {
    type: String,
    "default": null
  },
  "id": {
    type: String,
    "default": null,
    unique: true
  },
  "images": {
    "standard_resolution": "string",
    "thumbnail": "string",
    "low_resolution": "string"
  },
  "tags": {
    type: Array
  },
  "caption": {
    "id": "string",
    "from": {
      "text": "string",
      "username": "string",
      "full_name": "string",
      "type": {
        type: String,
        "default": null
      },
      "id": "string"
    }
  },
  "link": "string",
  "type": "string",
  "filter": "string",
  "user": {
    "username": "string",
    "full_name": "string",
    "profile_picture": "string",
    "id": "string"
  },
  "location": {
    "latitude": "string",
    "longitude": "string",
    "id": "string",
    "street_address": "string",
    "name": "string"
  },
  "comments": {
    "count": Number,
    "data": {
      type: Array
    }
  },
  "create_date_time": {
    type: Date,
    "default": Date.now
  },
  "update_time": {
    type: Number,
    "default": 0
  }
});

Model = mongoose.model('pinsta', Schema);

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

Record.updateOneById = function(id, modifier) {
  var def;
  def = Q.defer();
  Model.update({
    _id: id
  }, modifier, {
    upsert: false
  }, function(err, numberAffected, raw) {
    if (err) {
      return def.resolve({
        node_code: 44,
        msg: err['message'],
        err: err
      });
    }
    return def.resolve({
      node_code: 20000,
      data: {
        id: id,
        err: err,
        numberAffected: numberAffected,
        raw: raw,
        type: 'atlas',
        modifier: modifier
      },
      msg: 'ok'
    });
  });
  return def.promise;
};

Record.getRecordByUIDArray = function(uIDArray) {
  var def, defs, uid, _i, _len;
  def = Q.defer();
  defs = [];
  for (_i = 0, _len = uIDArray.length; _i < _len; _i++) {
    uid = uIDArray[_i];
    defs.push(Record.findOne({
      is_read: false,
      'user.username': uid
    }));
  }
  Q.all(defs).done(function(rs) {
    var i, item, list, uIDArrayWithoutAtlas, _j, _len1;
    list = [];
    uIDArrayWithoutAtlas = [];
    for (i = _j = 0, _len1 = rs.length; _j < _len1; i = ++_j) {
      item = rs[i];
      if (item['node_code'] === 20000) {
        if (item['data']) {
          list.push(item['data'].toJSON());
        } else {
          uIDArrayWithoutAtlas.push(uIDArray[i]);
        }
      }
    }
    return def.resolve({
      node_code: 20000,
      data: list,
      msg: 'ok',
      uIDArrayWithoutAtlas: uIDArrayWithoutAtlas
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

Record.getAllUserListBySortedId = function(lastID, limit, fields) {
  var condition, def;
  if (limit == null) {
    limit = 4;
  }
  if (fields == null) {
    fields = {
      'user.username': 1,
      _id: 1
    };
  }
  def = Q.defer();
  condition = lastID ? {
    _id: {
      $gt: ObjectId(lastID)
    }
  } : {};
  Model.find(condition, fields).limit(limit).exec(function(err, docs) {
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

Record.findOne = function(condition) {
  var def;
  if (condition == null) {
    condition = {};
  }
  def = Q.defer();
  Model.findOne(condition, function(err, doc) {
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
