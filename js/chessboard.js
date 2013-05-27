(function() {

  // date: 2013-05-26, author: mccreavy
  function ChessBoard(p) {
    var o = dirg.Board(p);

    var r = [];
    var COLS = 13;
    var ROWS = 13;

    // allocate the nodes
    var style = 'black';
    for (var y = 0 ; y < ROWS ; y++) {
      r[y] = [];
      for (var x = 0 ; x < COLS ; x++) {
        r[y][x] = dirg.BoardNode({ 'x': x-COLS/2, 'y' : y-ROWS/2 });
        r[y][x].style = style;
        style = (style == 'white' ? 'black' : 'white'); // update
        o.node.push(r[y][x]);
      }
    }

    // connect the neighbors
    for (var y = 0 ; y < COLS ; y++) {
      for (var x = 0 ; x < ROWS ; x++) {
        var n = r[y][x];
        if (y > 0) {
          if (x > 0) {
            n.addNeighbor('NW', r[y-1][x-1]);
          }
          n.addNeighbor('N', r[y-1][x]); // North
          if (x < COLS-1) {
            n.addNeighbor('NE', r[y-1][x+1]); // NorthEast
          }
        }
        if (x > 0) {
          n.addNeighbor('W', r[y][x-1]); // West
        }
        if (x < COLS-1) {
          n.addNeighbor('E', r[y][x+1]); // East
        }
        if (y < ROWS-1) {
          if (x > 0) {
            n.addNeighbor('SW', r[y+1][x-1]); // SouthWest
          }
          n.addNeighbor('S', r[y+1][x]); // South
          if (x < COLS-1) {
            n.addNeighbor('SE', r[y+1][x+1]); // SouthEast
          }
        }
      }
    }

    return o;
  };

  window.dirg.ChessBoard = ChessBoard;

})();