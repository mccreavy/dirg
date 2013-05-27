(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  // TODO(mccreavy): binding to event manager can be handled outside
  // TODO(mccreavy): of input.

  // date: 2013-05-19, author: mccreavy
  function create(p) {
    var o = {
      'addListeners': addListeners,
      'cursor': dirg.Point(0,0),
      'eventManager': (p && 'eventManager' in p) ? p.eventManager : null,
      'inputElement': (p && 'inputElement' in p) ? p.inputElement: 'needOne',
      'key': []
    };
    o.addListeners();
    return o;
  }

  // date: 2013-05-23, author: mccreavy
  function addListeners() {
    var self = this;
    $(this.inputElement).keydown(function(e) {
      self.key[e.keyCode] = 1;
    });
    $(this.inputElement).keyup(function(e) {
      self.key[e.keyCode] = 0;
    });
    $(this.inputElement).mousemove(function(e) {
      self.cursor.x = e.offsetX;
      self.cursor.y = e.offsetY;
      if (self.eventManager) {
        var ev = dirg.event.create({ name: 'mousemove' });
        self.eventManager.enqueue(ev);
      }
    });
    $(this.inputElement).click(function(e) {
      if (self.eventManager) {
        var ev = dirg.event.create({ name: 'mouseclick' });
        self.eventManager.enqueue(ev);
      }
      e.preventDefault();
      return false;
    });
  }

  window.dirg.input = {
    'create': create
  };
})();