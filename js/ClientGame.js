(function() {

  // date: 2013-07-08, author: mccreavy
  // Client-side representation of Game.
  function ClientGame(p) {
    var o = {
      'addAccount': addAccount,
      'removeAccount': removeAccount,
      'hasAccount': hasAccount,
      'isOwner': isOwner,
      'type': 'Client Unspecified',
      'id': p.id,
      'owner': p.owner,
      'account': p.account,
      'state': p.state
      // 'board': p.board
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
        this.account.splice(i, 1);
        return;
      }
    }
  }

  // date: 2013-07-10; author: mccreavy
  function hasAccount(account) {
    console.log("Checking to see if account is in game: " + account);
    for (var i = 0 ; i < this.account.length ; i++) {
      if (this.account[i] == account) {
        console.log("Account is in game");
        return true;
      }
    }
    console.log("Account isn't in game");
    return false;
  }

  // date: 2013-07-10; author: mccreavy
  function isOwner(account) {
    return this.owner == account;
  }

  window.dirg.ClientGame = ClientGame;
})();