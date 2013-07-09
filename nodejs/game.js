
var HexBoard = require('./hexboard').HexBoard;

var id = 0;

// date: 2013-06-015; author: mccreavy
function addPlayer(userId) {
  // TODO(mccreavy): check if player can be added.
  this.userId.push(userId);
  return true;
}

// Need a method for serializing game state for transport.
// Maybe make a wrapper class to handle that rather than doing
// it "inside" here.

function Game(p) {
  var o = {
    'id': id++,
    'board': HexBoard(),
    'owner': p.owner,  // owner by account id ... needed?
                       // or just assume account[0] is the owner?
    'account': [ p.owner ], // players by id
    'addPlayer': addPlayer
  };
  console.log("New Game " + o.id);

  return o;
}

module.exports.Game = Game;
