var nodemailer, _;

nodemailer = require("nodemailer");

_ = require("lodash");

module.exports = function(opts) {
  var transporter;
  opts || (opts = {});
  transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "alexemier@gmail.com",
      pass: "04030958"
    }
  });
  console.log('mail_start');
  opts = _.extend({
    from: "alexemier@gmail.com",
    to: "zhangjie@591ku.com, 379382995@qq.com",
    subject: "[NODE ERROR]",
    html: "test"
  }, opts);
  return transporter.sendMail(opts, function(err, rs) {
    if (err) {
      console.log("mail fail: " + err);
    } else {
      console.log("mail success: " + rs.response);
    }
  });
};
