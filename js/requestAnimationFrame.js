(function() {
  // date: 2013-05-26, author: mccreavy
  window.dirg.requestAnimationFrame = (function(){
    var implementation = [
        'requestAnimationFrame',
        'webkitRequestAnimationFrame',
        'mozRequestAnimationFrame'
    ];

    // TODO(mccreavy): lots of unnecessary closures all up in here.
    for (var i = 0 ; i < implementation.length ; i++) {
      if (implementation[i] in window) {
        var func = window[implementation[i]];
        return function(callback) {
          window[implementation[i]](callback);
        }
      }
    }
    return function(callback ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();
})();