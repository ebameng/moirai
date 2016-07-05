var Buffer, Q, getBucketTokenSync, getMediaAcessURLSync, getThumbImage, qiniu, uploadFileByBuffer;

qiniu = require("qiniu");

Buffer = require("buffer");

Q = require("q");

qiniu.conf.ACCESS_KEY = "iqdqcxMfKgzY4SLqIAxGbufYuEsuxwzJQ9zx5Ky2";

qiniu.conf.SECRET_KEY = "dfPTfQMzmlWJ-h6cweb950yKBTJd8gLFJhv8zcfo";

getBucketTokenSync = function(bucketname) {
  var putPolicy;
  putPolicy = new qiniu.rs.PutPolicy(bucketname);
  return putPolicy.token();
};

getMediaAcessURLSync = function(domain, key) {
  var baseUrl, policy;
  baseUrl = qiniu.rs.makeBaseUrl(domain, key);
  policy = new qiniu.rs.GetPolicy();
  return policy.makeRequest(baseUrl);
};

getThumbImage = function(domain, key, w, h) {
  var iv, policy, url;
  if (w == null) {
    w = 100;
  }
  if (h == null) {
    h = null;
  }
  url = qiniu.rs.makeBaseUrl(domain, key);
  iv = new qiniu.fop.ImageView();
  policy = new qiniu.rs.GetPolicy();
  iv.width = w;
  iv.height = h;
  url = iv.makeRequest(url);
  url = policy.makeRequest(url);
  return url;
};

uploadFileByBuffer = function(buffer, uptoken, key) {
  var def, extra;
  extra = new qiniu.io.PutExtra();
  def = Q.defer();
  qiniu.io.put(uptoken, key, buffer, extra, function(err, rs) {
    if (err) {
      def.resolve({
        status: false,
        data: null,
        err: err
      });
      return;
    }
    def.resolve({
      status: true,
      data: rs
    });
  });
  return def.promise;
};

exports.getBucketTokenSync = getBucketTokenSync;

exports.uploadFileByBuffer = uploadFileByBuffer;

exports.getMediaAcessURLSync = getMediaAcessURLSync;

exports.getThumbImage = getThumbImage;
