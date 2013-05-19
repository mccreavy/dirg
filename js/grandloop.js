(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  function create() {
    log("Creating GrandLoop");
  }

  function init() {

  }

  function start() {

  }

  function stop() {

  }

  window.dirg.grandloop = {
    'create': create,
    'init': init,
    'start': start,
    'stop': stop
  };
}());