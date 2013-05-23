(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  // date: 2013-05-19, author: mccreavy
  function create(p) {
    return {
      'inputElement': 'needOne',
      'key': []
    };
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
    /*
    $(this.element).mousemove(function(e) {
      self.cursor.x = e.offsetX;
      self.cursor.y = e.offsetY;
      for (var i = 0 ; i < self.mouseMoveHook.length ; i++) {
        self.mouseMoveHook[i](e);
      }
    });
    $(this.element).click(function(e) {
      if (self.eventQueue) {
        self.eventQueue.push(
          xmm.Event(
            'click',
            xmm.Math.Point(e.clientX, e.clientY)
          )
        );
      }
      e.preventDefault();
      return false;
    });
    */
  }

  window.dirg.input = {
    'create': create
  };
}());