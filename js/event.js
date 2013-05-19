(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  /**
   *
   *
   */

  // date: 2013-05-19, author: mccreavy
  function cycle() {
    log("cycling");
  }

  // date: 2013-05-19, author: mccreavy
  function init() {
    log("init");
  }

  // date: 2013-05-19, author: mccreavy
  function newEvent() {
    log("new");
  }

  // date: 2013-05-19, author: mccreavy
  function queue() {
    log("queue");
  }

  window.dirg.event = {
    'cycle': cycle,
    'init': init,
    'newEvent': newEvent,
    'queue': queue
  };
}());