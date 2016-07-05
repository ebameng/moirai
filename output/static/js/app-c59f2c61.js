define(['boot/appcore'], function(APPCore) {
  var APP, calculateContentBoxWhenReize, onLocationChange;
  calculateContentBoxWhenReize = function() {
    var height;
    height = window.innerHeight - 60;
    return $('#content').height(height);
  };
  globFnWatchResize(function() {
    return calculateContentBoxWhenReize();
  });
  onLocationChange = function(url) {
    var className, mapClassName, routeMap;
    routeMap = {
      'nav-welcome': ['/', '/home', '/index', '/welcome'],
      'nav-atlas-list': "/atlas/list",
      'nav-atlas-publish': "/atlas/publish",
      'nav-my-atlas-list': "/my/atlas/list",
      'nav-my-atlas-list-timming': "/my/atlas/list/timming",
      'nav-atlas-top': "/atlas/list/top",
      'nav-user-list': ["/user/list", "/user/search"],
      'nav-user-recmd-list': "/user/recmd/list",
      'nav-user-list-active': ["/user/list/active", '/user/atlas/list'],
      'nav-label-list': [/^\/label/],
      'nav-stickers-list': ["/stickers/list", "/stickers/detail/list", "/stickers/type/list", '/stickers/publish'],
      'nav-admin-list': ["/admin/list", "/admin/publish"],
      'nav-admin-permission': "/admin/permission",
      'nav-admin-broadcast': "/admin/broadcast",
      'nav-admin-notification': [/^\/admin\/notification\/\S+/]
    };
    url = url.split('?')[0];
    mapClassName = function(url) {
      var f, filters, pro, _i, _len;
      for (pro in routeMap) {
        filters = [].concat(routeMap[pro]);
        for (_i = 0, _len = filters.length; _i < _len; _i++) {
          f = filters[_i];
          if (typeof f === 'string') {
            if (url === f) {
              return pro;
            }
          } else {
            if (f.test(url)) {
              return pro;
            }
          }
        }
      }
      return null;
    };
    className = mapClassName(url);
    if ($('#sideBar .' + className).hasClass('on')) {
      return;
    }
    if (className) {
      $('#sideBar .navItem').not('.' + className).removeClass('on');
      return $('#sideBar .' + className).addClass('on');
    }
  };
  APP = (function() {
    function APP(opts) {
      var a;
      this.bindEvents();
      a = new APPCore({
        onChange: function(state, isLocation) {
          onLocationChange(state.url);
          if (isLocation) {
            return;
          }
          return window['_SmartPipe_'].doPipeRequest(state);
        }
      });
    }

    APP.prototype.bindEvents = function() {
      return $('.user-nav a.user').on('click', function(e) {
        var $security;
        $security = $('#security');
        if ($security.hasClass('show')) {
          $security.removeClass('show');
        } else {
          $security.addClass('show');
        }
        return require(['main'], function(mod) {
          return mod.init();
        });
      });
    };

    return APP;

  })();
  return APP;
});
