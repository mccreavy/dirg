
require('./math');

// date: 2013-06-01, author: mccreavy
function HexNode(p) {
  var o = {
      'id': p.id,
      'neighbor': {},
      'position': { 'x': p.x, 'y': p.y },
      'size': p.size || 50,
      'ring': p.ring
  };
  o.containsPoint = containsPoint;
  o.addNeighbor = addNeighbor;
  return o;
}

// date: 2013-06-01, author: mccreavy
function containsPoint(position) {
  var poly = [];
  for (var i = 0 ; i < 6 ; i++) {
    var x = Math.cos(Math.PI*2/6*(i))*(this.size-1); // -1 for margins
    var y = Math.sin(Math.PI*2/6*(i))*(this.size-1); // -1 for margins
    poly[i] = { x: this.position.x + x, y: this.position.y + y };
  }

  return MMath.pointInPoly(poly, position);
}

// date: 2013-06-01, author: mccreavy
function addNeighbor(name, node) {
  this.neighbor[name] = node;
}

module.exports.HexNode = HexNode;