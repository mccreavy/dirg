(function() {

  // date: 2013-07-08, author: mccreavy
  // Client-side representation of Game.
  function ClientGame(p) {
    var o = {
      'addAccount': addAccount,
      'removeAccount': removeAccount,
      'id': p.id,
      'owner': p.owner,
      'account': p.account
    };
    return o;
  }

  // date: 2013-07-08, author: mccreavy
  function addAccount(account) {
    console.log("Adding account: " + account);
    this.account.push(account);
  }

  // date: 2013-07-08, author: mccreavy
  function removeAccount(account) {
    for (var i = 0 ; i < this.account.length ; i++) {
      if (this.account[i] == account) {
        this.splice(i, 1);
        return;
      }
    }
  }

  window.dirg.ClientGame = ClientGame;
})();