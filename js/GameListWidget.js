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
      details.append("<p>Type: " + g.type + "</p>");
      details.append("<p>State: " + g.state + "</p>");
      details.append("<p>Participant: " + g.account.join(",") + "</p>");
      details.append("<p>Player: " + g.player + "</p>");
      details.append("<p>Board: " + g.board + "</p>");

      var inGame = (client.account && g.hasAccount(client.account.id));
      var isOwner = (client.account && g.isOwner(client.account.id));

      var joinButton = $("<button>Join</button>");
      if (!client.account || inGame) {
        joinButton.attr("disabled", "disabled");
      }
      (function() {
        var id = g.id;
        joinButton.click(function() {
          client.joinGame(id);
        });
      })();
      $(line).append(joinButton);

      var exitButton = $("<button>Exit</button>");
      if (!client.account || !inGame) {
        exitButton.attr("disabled", "disabled");
      }
      (function() {
        var id = g.id;
        exitButton.click(function() {
          client.exitGame(id);
        });
      })();
      $(line).append(exitButton);

      var startButton = $("<button>Start</button>");
      if (!client.account || !isOwner) {
        startButton.attr("disabled", "disabled");
      }
      $(line).append(startButton);

      $(this.container).append(line);
      $(this.container).append(details);
    }
  }

  window.dirg.GameListWidget = GameListWidget;
})();