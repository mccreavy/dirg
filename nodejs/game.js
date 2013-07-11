
var HexBoard = require('./hexboard').HexBoard;

var id = 0;

// Return just "the metadata" about the game.
// date: 2013-07-10; author: mccreavy
function getHeader() {
  return { 'id': this.id, 'type': this.type,
      'owner': this.owner, 'account': this.account,
      'state': this.state };
}

// date: 2013-06-15; author: mccreavy
function addAccount(account) {
  // TODO(mccreavy): check if player can be added.
  this.account.push(account);
  return true;
}

// date: 2013-07-10; author: mccreavy
function hasAccount(account) {
  for (var i = 0 ; i < this.account.length ; i++) {
    if (this.account[i] == account) {
      return true;
    }
  }
  return false;
}

// Need a method for serializing game state for transport.
// Maybe make a wrapper class to handle that rather than doing
// it "inside" here.

function Game(p) {
  var o = {
    'id': id++,
    'type': 'Server Unspecified',
    //'board': HexBoard(),
    'owner': p.owner,  // owner by account id ... needed?
                       // or just assume account[0] is the owner?
    'account': [ p.owner ], // players by id
    'addAccount': addAccount,
    'getHeader': getHeader,
    'hasAccount': hasAccount,
    'state': 'Created'
  };
  return o;
}

module.exports.Game = Game;
