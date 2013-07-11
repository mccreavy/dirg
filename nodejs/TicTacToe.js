
var Game = require('./game').Game;

function getState() {
  return { 'id': this.id, 'player': this.player, 'board': this.board };
}

function TicTacToe(p) {
  var o = Game(p);
  o.board = [];
  o.board.push(1);
  o.board.push(2);
  o.board.push(3);
  o.board.push(4);
  o.board.push(5);
  o.board.push(6);
  o.board.push(7);
  o.board.push(8);
  o.board.push(9);
  o.player = null;
  o.getState = getState;
  o.type = 'TICTACTOE';
  // Add the TicTacToe board and logic to the Game.

  return o;
}

module.exports.TicTacToe = TicTacToe;
