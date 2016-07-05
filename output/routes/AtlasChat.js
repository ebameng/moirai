var api;

api = require('../libs/api');

module.exports = function(server) {
  server.post('/client/login', function(req, res) {
    var type, uid;
    type = req.body['type'];
    uid = req.body['uid'];
    return api.request({
      method: 'post',
      pathname: '/third/register',
      headers: {
        did: '123321'
      },
      query: {
        type: type,
        uid: uid
      }
    }).done(function(rs) {
      return res.send(rs);
    });
  });
  server.post('/client/comment/append', function(req, res) {
    var atlasId, content, replyId, token;
    content = req.body['content'];
    atlasId = req.body['atlasId'];
    replyId = req.body['replyId'];
    token = req.body['token'];
    return api.request({
      method: 'post',
      pathname: '/user/comment/atlas/add',
      headers: {
        token: token
      },
      query: {
        content: content,
        atlasId: atlasId,
        replyId: replyId
      }
    }).done(function(rs) {
      return res.send(rs);
    });
  });
  server.get('/check/someone/followed', function(req, res) {
    var id, token;
    id = req.query['id'];
    token = req.query['token'];
    return api.request({
      method: 'get',
      pathname: '/info',
      headers: {
        token: token
      },
      query: {
        id: id
      }
    }).done(function(rs) {
      res.write(JSON.stringify(rs));
      return res.end();
    });
  });
  return server.post('/follow/someone', function(req, res) {
    var token, userId;
    userId = req.body['userId'];
    token = req.body['token'];
    return api.request({
      method: 'post',
      pathname: '/user/attention/add',
      headers: {
        token: token
      },
      query: {
        userId: userId
      }
    }).done(function(rs) {
      return res.send(rs);
    });
  });
};
