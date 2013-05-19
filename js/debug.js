(function() {
  function init() {
    console.log("debug init");
  }

  function log(m) {
    console.log("log: " + m);
  }

  window.dirg.debug = {
    'init': init,
    'log': log
  };
}());