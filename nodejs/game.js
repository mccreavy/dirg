
require('./hexboard');

var id = 0;

function Game(p) {
  var o = {
    'id': id++,
    'board': HexBoard()
  };
  console.log("New Game " + o.id);

  return o;
}

module.exports.Game = Game;
