(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;
  var Point = window.dirg.Point;

  function Node() {
    this.position = Point(0,0);
    this.neighbor = [];
    this.owner = null;
    return this;
  }

  // date: 2013-05-19, author: mccreavy
  function create(d) {
    var board = {
      'node': []
    };
    for (var i = 0 ; i < d.radius) {
      board.node.append(new Node());
    }
    return board;
  }

  window.dirg.board {
    'create': create
  };
}());