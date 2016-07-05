module.exports = {
  pageMaker: function(option) {
    var current, ender, it, k, leftWind, list, next, pathname, prev, query, queryString, rightWind, starter, totalPage, v, wing, _i, _j, _ref;
    current = parseInt(option['current']);
    totalPage = parseInt(option['totalPage']);
    wing = option['wing'] || 4;
    pathname = option['pathname'];
    query = option['query'];
    starter = current - wing <= 0 ? 1 : current - wing;
    ender = current + wing < totalPage ? current + wing : totalPage;
    leftWind = [];
    rightWind = [];
    for (it = _i = starter; _i <= current; it = _i += 1) {
      leftWind.push(it);
    }
    for (it = _j = _ref = current + 1; _j <= ender; it = _j += 1) {
      rightWind.push(it);
    }
    prev = leftWind.length <= 1 ? null : current - 1;
    next = rightWind.length <= 1 ? null : current + 1;
    list = [];
    list.push.apply(list, leftWind);
    list.push.apply(list, rightWind);
    queryString = [];
    for (k in query) {
      v = query[k];
      queryString.push(k + '=' + v);
    }
    return {
      start: 1,
      end: totalPage,
      prev: prev,
      list: list,
      next: next,
      current: current,
      totalPage: totalPage,
      pathname: pathname || '/',
      queryString: queryString.join('&')
    };
  },
  whenHappend: function(stamp) {
    var d;
    stamp = parseInt(stamp);
    d = Math.abs(+(new Date) - stamp);
    d = d / (1000 * 60);
    d = parseInt(d);
    if (d < 10) {
      return "just now";
    }
    if (d >= 10 && d < 60) {
      return d + 'mins';
    }
    d = parseInt(d / 60);
    if (d < 24) {
      if (d === 1) {
        return d + 'hour';
      }
      return d + 'hours';
    }
    d = parseInt(d / 24);
    if (d >= 1 && d < 30) {
      if (d === 1) {
        return 'day';
      }
      return d + 'days';
    }
    d = parseInt(d / 30);
    if (d < 12) {
      if (d === 1) {
        return 'mon';
      }
      return d + 'mons';
    }
    d = d / 12;
    if (d === 1) {
      return d + 'year';
    }
    return d + 'years';
  },
  timeFormat: function(stamp) {
    var date, day, hour, min, month, sec, year;
    date = new Date(stamp);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    return "" + year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
  },
  dateFormat: function(stamp) {
    var date, day, hour, min, month, sec, year;
    date = new Date(stamp);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    return "" + year + "年" + month + "月" + day + "日";
  },
  checkResultSet: function() {
    var rs;
    return rs = [].concat.apply([]);
  }
};
