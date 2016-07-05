listenEleResize(function(el, cb) {
  if (cb == null) {
    cb = function() {};
  }
  return window.addEventListener('resize', function(e) {
    return cb.call(el, e);
  });
});
