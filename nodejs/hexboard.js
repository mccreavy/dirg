var HexNode = require('./hexnode');

function HexBoard(p) {
  var o = {
    'size': 50,
    'node': []
  };

  // allocate the nodes - each ring is a hexagon itself with
  // its edges bisected into "ring" hexagons.
  var ring = [];

  var radius = 0;
  var ringCount = 0;
  var id = 0;
  do {
    var currentRing = 0;
    ring[ringCount] = [];
    for (var i = 0 ; i < (ringCount > 0 ? 6 : 1) ; i++) {
      var p1, p2;
      p1 = { 'radius': radius, 'theta': ((Math.PI*2)/6) * i };
      if (ringCount > 1) {
        p2 = { 'radius': radius, 'theta': ((Math.PI*2)/6) * (i+1) };
      }
      for (var j = 0 ; j < (ringCount > 1 ? ringCount : 1) ; j++) {
        var c3;
        if (p2) {
          var c1 = { 'x': Math.sin(p1.theta) * p1.radius,
                     'y': Math.cos(p1.theta) * p1.radius };
          var c2 = { 'x': Math.sin(p2.theta) * p2.radius,
                     'y': Math.cos(p2.theta) * p2.radius };

          c3 = { 'x' : (c1.x + (c2.x-c1.x)*(j/ringCount)),
                 'y' : (c1.y + (c2.y-c1.y)*(j/ringCount)) };
        } else {
          c3 = { 'x' : Math.sin(p1.theta) * p1.radius,
                 'y' : Math.cos(p1.theta) * p1.radius };
        }
        if (c3.x > -400 && c3.x < 400 && c3.y > -380 && c3.y < 380) {
          ring[ringCount][currentRing] = HexNode({
              'id': id++,
              'x': c3.x,
              'y': c3.y,
              'size': o.size,
              'ring': ringCount
              });
          o.node.push(ring[ringCount][currentRing]);
          ring[ringCount][currentRing].id = o.node.length;
          currentRing++;
        }
      }
    }
    radius += 2*Math.sqrt(Math.pow(o.size, 2) - Math.pow(o.size/2,2));
    ringCount++;
  } while (ringCount < 15);

  // connect the neighbors
  // don't know how to do the geometry here to locate neighbors
  // mathematically here, but I can calculate center points
  // of neighbors and search for them that way...  exhaustively.
  // Sucks because it takes so much CPU.
  // There are several optimizations here I'm not going to do until the
  // rest of the shit is done.
  for (var i = 0 ; i < o.node.length ; i++) {
    for (var j = 0 ; j < 6 ; j++) {
      var x = o.node[i].position.x +
          Math.sin(Math.PI*2/6*j)*(o.size*1.25);
      var y = o.node[i].position.y +
          Math.cos(Math.PI*2/6*j)*(o.size*1.25);
      for (var k = 0 ; k < o.node.length ; k++) {
        if (i == k) {
          continue;
        }
        if (o.node[k].containsPoint({ 'x': x, 'y': y })) {
          o.node[i].addNeighbor(j+1, o.node[k]);
        }
      }
    }
  }

  return o;
}

module.exports.HexBoard = HexBoard;