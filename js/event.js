(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;
  var eventId = 0;
  // date: 2013-05-19, author: mccreavy
  function create(p) {
    var o = {
      'id': ++eventId,
      'name': (p && p.name) || "unnamed event",
      'hook': {},
      'pushHook': pushHook,
      'removeHook': removeHook
    };
    return o;
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

  window.dirg.event = {
    'create': create
  };
}());