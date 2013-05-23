(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  // date: 2013-05-22; author: mccreavy
  function create() {
    var o = {
      'cycleCount': 0,
      'cycle': cycle,
      'hook': {},
      'pushHook': pushHook,
      'removeHook': removeHook
    };
    return o;
  }

  // date: 2013-05-22; author: mccreavy
  function init() {

  }

  // date: 2013-05-22; author: mccreavy
  function start() {

  }

  // date: 2013-05-22; author: mccreavy
  function stop() {

  }

  // date: 2013-05-22; author: mccreavy
  function pushHook(type, f) {
    if (!(type in this.hook)) {
      this.hook[type] = [];
    }
    this.hook[type].push(f);
  }

  // date: 2013-05-22; author: mccreavy
  function removeHook(type, f) {
    if (!(type in this.hook)) {
      return;
    }
    var i = 0;
    while (i < this.hook[type].length) {
      if (this.hook[type][i] != f) {
        i++;
        continue;
      }
      this.hook[type].splice(i, 1);
    }
    if (this.hook[type].length == 0) {
      delete this.hook[type];
    }
  }

  // date: 2013-05-22; author: mccreavy
  function cycle() {
    this.cycleCount++;
    // precycle hooks
    if ('PRE' in this.hook) {
      for (var i = 0 ; i < this.hook['PRE'].length ; i++) {
        try {
          this.hook['PRE'][i]();
        } catch (e) {
          console.log("PREHOOK EXCEPTION " + e);
        }
      }
    }
    // postcycle hooks
    if ('POST' in this.hook) {
      for (var i = 0 ; i < this.hook['POST'].length ; i++) {
        try {
          this.hook['POST'][i]();
        } catch (e) {
          console.log("POSTHOOK EXCEPTION " + e);
        }
      }
    }
  }

  window.dirg.grandloop = {
    'create': create
  };
}());