var accessMap, getAllRolePermissionList, getNodeReadMapRule, isUrlInPermission, isUrlListInPermission, regTrimSlash, _;

_ = require('lodash');

regTrimSlash = /^\/|\/$/g;

accessMap = {
  tplus: {
    title: 'Tplus',
    site: 'http://tyycool.com',
    list: {
      "/atlas/list": {
        name: '全部用户图集',
        clsName: 'nav-atlas-list',
        secureLevel: 'super',
        mode: 'read',
        deps: "/admin/atlas/list/all"
      },
      "/atlas/publish": {
        group: 'atlas',
        name: '发布图集',
        clsName: 'nav-atlas-publish',
        mode: 'read',
        deps: ["/admin/label/list"]
      },
      "/my/atlas/list": {
        group: 'atlas',
        clsName: 'nav-my-atlas-list',
        name: '我的图集',
        mode: 'read',
        deps: "/admin/atlas/list"
      },
      "/my/atlas/list/timming": {
        name: '我的定时图集',
        clsName: 'nav-my-atlas-list-timming',
        mode: 'read',
        deps: "/admin/atlas/timer/all"
      },
      "/atlas/list/top": {
        name: '置顶图集列表',
        clsName: 'nav-atlas-top',
        mode: 'read',
        deps: "admin/atlas/top/list"
      },
      "/user/list": {
        name: '全部用户列表',
        clsName: 'nav-user-list',
        mode: 'read',
        secureLevel: 'super'
      },
      "/user/list/active": {
        name: '活跃用户列表',
        clsName: 'nav-user-list-active',
        mode: 'read',
        secureLevel: 'super',
        deps: ['admin/user/live/list']
      },
      "/user/recmd/list": {
        name: '推荐用户列表',
        clsName: 'nav-user-recmd-list',
        mode: 'read',
        secureLevel: 'super',
        deps: ['admin/recommend/user/list']
      },
      "/label/list": {
        name: '标签管理',
        clsName: 'nav-label-list',
        mode: 'read',
        deps: '/admin/label/list'
      },
      "/label/add": {
        mode: 'write',
        deps: '/admin/label/add',
        secureLevel: 'all'
      },
      "/stickers/list": {
        name: '贴纸管理',
        clsName: 'nav-stickers-list',
        mode: 'read',
        deps: '/admin/sticker/common/list'
      },
      "/stickers/add": {
        mode: 'write',
        deps: '/admin/stickers/add',
        secureLevel: 'all'
      },
      "/admin/list": {
        name: '管理员中心',
        mode: 'read',
        clsName: 'nav-admin-list',
        secureLevel: 'super'
      },
      "/admin/add": {
        name: '添加管理员',
        mode: 'write',
        secureLevel: 'super'
      },
      "/atlas/publish/top": {
        name: '发布置顶图集',
        mode: 'write',
        secureLevel: 'super'
      },
      "vip/publish": {
        name: 'VIP管理',
        mode: 'write',
        clsName: 'nav-vip-publish',
        secureLevel: 'super',
        deps: ''
      },
      "/admin/permission": {
        name: '权限配置',
        mode: 'read',
        clsName: 'nav-admin-permission',
        secureLevel: 'super',
        deps: ''
      },
      "/admin/broadcast": {
        name: '广播中心',
        mode: 'read',
        clsName: 'nav-admin-broadcast',
        secureLevel: 'super',
        deps: ''
      },
      "/admin/notification/list": {
        name: '系统消息通知管理',
        mode: 'read',
        clsName: 'nav-admin-notification',
        secureLevel: 'super',
        deps: ''
      }
    }
  }
};

getAllRolePermissionList = function(roleList) {
  return _.flatten(_.pluck(roleList, 'permissionUrls'));
};

isUrlInPermission = function(url, list) {
  var item, perUrl, _i, _len;
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    item = list[_i];
    url = url.replace(regTrimSlash, '');
    perUrl = item['url'].replace(regTrimSlash, '');
    if (item['level'] === 0) {
      if (url === perUrl) {
        return true;
      }
    } else {
      if (url.indexOf(perUrl) === 0) {
        return true;
      }
    }
  }
  return false;
};

isUrlListInPermission = function(urlList, permissionSet) {
  var url, _i, _len;
  for (_i = 0, _len = urlList.length; _i < _len; _i++) {
    url = urlList[_i];
    if (isUrlInPermission(url, permissionSet) === true) {
      return true;
    }
    return false;
  }
  return false;
};

getNodeReadMapRule = function(node, permissionSet, isSuper) {
  var depsUrlList, list, opts, results, url;
  list = node['list'];
  results = [];
  for (url in list) {
    opts = list[url];
    if (isSuper === 1 && opts['mode'] === 'read') {
      results.push({
        name: opts['name'],
        clsName: opts['clsName'],
        url: url
      });
      continue;
    }
    if (opts['secureLevel'] === 'super' || opts['mode'] === 'write') {
      continue;
    }
    if (opts['secureLevel'] === 'all') {
      results.push({
        name: opts['name'],
        clsName: opts['clsName'],
        url: url
      });
      continue;
    }
    depsUrlList = [].concat(opts['deps']);
    if (isUrlListInPermission(depsUrlList, permissionSet)) {
      results.push({
        name: opts['name'],
        clsName: opts['clsName'],
        url: url
      });
    }
  }
  return results;
};

exports.getAllNodeReadMapRule = function(roles, isSuper) {
  var appNodeName, node, permissionSet, resultMap;
  permissionSet = getAllRolePermissionList(roles);
  resultMap = {};
  for (appNodeName in accessMap) {
    node = accessMap[appNodeName];
    resultMap[appNodeName] = {
      title: node['title'],
      site: node['site'],
      list: getNodeReadMapRule(node, permissionSet, isSuper)
    };
  }
  return resultMap;
};

exports.isUrlAvailable = function(url, node, roles, isSuper) {
  var depsUrlList, opts, permissionSet;
  node = accessMap[node];
  if (!node) {
    return false;
  }
  url = '/' + url.replace(regTrimSlash, '');
  opts = node['list'][url];
  if (!opts) {
    return false;
  }
  if (isSuper === 1 || isSuper === true) {
    return true;
  }
  if (opts['secureLevel'] === 'super' && isSuper === 0) {
    return false;
  }
  if (opts['secureLevel'] === 'all') {
    return true;
  }
  depsUrlList = depsUrlList = [].concat(opts['deps']);
  permissionSet = getAllRolePermissionList(roles);
  return isUrlListInPermission(depsUrlList, permissionSet);
};
