(function() {

  // date: 2013-07-08, author: mccreavy
  function GameListWidget(p) {
    var o = {
      'container': p.container,
      'render': render
    };
    return o;
  };

  function render(gameList) {
    $(this.container).empty();
    if (!gameList) {
      return;
    }
    for (var i in gameList) {
      var g = gameList[i];
      var line = $("<p>" + g.id + "</p>");
      var details = $("<p>Owner: " + g.owner + "</p>");
      details.append("<p>Participant: " + g.account.join(",") + "</p>");
      if (1 || notJoined) { // TODO(mccreavy)
        var joinButton = $("<button>Join</button>");
        (function() {
          var id = g.id;
          joinButton.click(function() {
            client.joinGame(id);
          });
        })();
        $(line).append(joinButton);
      }
      if (1 || joined) { // TODO(mccreavy)
        var exitButton = $("<button>Exit</button>");
        (function() {
          var id = g.id;
          exitButton.click(function() {
            client.exitGame(id);
          });
        })();
        $(line).append(exitButton);
      }
      if (1 || owner) { // TODO(mccreavy)
        $(line).append("<button>Start</button>");
      }
      $(this.container).append(line);
      $(this.container).append(details);
    }
  }

  window.dirg.GameListWidget = GameListWidget;
})();