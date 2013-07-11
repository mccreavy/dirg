(function() {

  function updateState(s) {
    if (s) {
      this.board = s.board;
      this.player = s.player;
    } else {
      delete this.board;
      delete this.player;
    }
  }

  function ClientTicTacToe(p) {
    var o = window.dirg.ClientGame(p);
    o.type = "TICTACTOE";
    o.updateState = updateState;
    return o;
  }

  window.dirg.ClientTicTacToe = ClientTicTacToe;
})();