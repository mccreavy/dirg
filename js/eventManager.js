(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  // date: 2013-05-26, author: mccreavy
  function create(p) {
    var o = {
      'clear': clear,
      'dequeue': dequeue,
      'process': process,
      'push': push,
      '_queue': [],
      'enqueue': enqueue
    };
    return o;
  }

  // date: 2013-05-26, author: mccreavy
  function clear() {
    // TODO(mccreavy): implement
  }

  // date: 2013-05-26, author: mccreavy
  function dequeue() {
    return this._queue.shift();
  }

  // date: 2013-05-26, author: mccreavy
  function process() {
    while (this._queue.length > 0) {
      var e = this.dequeue();
      if ('PRE' in e.hook) {
        for (var i = 0 ; i < e.hook['PRE'].length ; i++) {
          try {
            e.hook['PRE'][i]();
          } catch (e) {
            console.log("PREEVENTHOOK EXCEPTION " + e);
          }
        }
      }
    }
  }

  // date: 2013-05-26, author: mccreavy
  function push(e) {
    this._queue.unshift(e);
  }

  // date: 2013-05-26, author: mccreavy
  function enqueue(e) {
    this._queue.push(e);
  }

  window.dirg.eventManager = {
    'create': create
  };
}());