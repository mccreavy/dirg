(function() {

  function updateState(s) {
    console.log("NEED TO UPDATE STATE", s);
    this.board = s.board;
    this.player = s.player;
  }

  function ClientTicTacToe(p) {
    var o = window.dirg.ClientGame(p);
    o.type = "TICTACTOE";
    o.updateState = updateState;
    return o;
  }

  window.dirg.ClientTicTacToe = ClientTicTacToe;
})();