(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  // date: 2013-05-22; author: mccreavy
  function create() {
    var o = {
      'cycleCount': 0,
      'cycle': cycle,
      'hook': {},
      'pushHook': pushHook,
      'removeHook': removeHook,
      'start': start,
      'stop': stop,
      'time': null
    };
    return o;
  }

  // date: 2013-05-22; author: mccreavy
  function init() {

  }

  // date: 2013-05-22; author: mccreavy
  function start() {
    if ('START' in this.hook) {
      for (var i = 0 ; i < this.hook['START'].length ; i++) {
        try {
          this.hook['START'][i]();
        } catch (e) {
          console.log("STARTHOOK EXCEPTION " + e);
        }
      }
    }
    // TODO(mccreavy): start the cycle interval
    this.cycle();
  }

  // date: 2013-05-22; author: mccreavy
  function stop() {
    // TODO(mccreavy): stop the cycle interval

    if ('STOP' in this.hook) {
      for (var i = 0 ; i < this.hook['STOP'].length ; i++) {
        try {
          this.hook['STOP'][i]();
        } catch (e) {
          console.log("STOPHOOK EXCEPTION " + e);
        }
      }
    }
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
    this.time = new Date().getTime();
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
    if (true) {
      var self = this;
      dirg.requestAnimationFrame(function() { self.cycle(); });
    }
  }

  window.dirg.grandloop = {
    'create': create
  };
})();