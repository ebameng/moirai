var config;

config = {
  watcher: {
    browser: {
      target: ["static/**/*.*"]
    },
    boot: {
      target: ["libs/**/*", "model/**/*", "routes/**/*", "extend/**/*.js", "handler/**/*", "*.coffee", "config.json"]
    }
  },
  dev_remote_server_name: "test.api.591ku.com",
  pro_remote_server_name: "tplus.api.591ku.com",
  pro_remote_server_ip: "10.237.154.116:9998",
  dev_port: 8889,
  pro_port: 8888,
  dev_static_CDN: 'http://nuoyatest.qiniudn.com',
  spider_static_CDN: 'http://spider.591ku.com',
  fms_spider_static_CDN: 'http://spider.fmsjs.com',
  pro_static_CDN: 'http://nuoya.591ku.com'
};

module.exports = config;
