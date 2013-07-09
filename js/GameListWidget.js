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
      var line = $("<p>" + gameList[i].id + "</p>");
      if (1 || notJoined) { // TODO(mccreavy)
        $(line).append("<button>Join</button>");
      }
      if (1 || joined) { // TODO(mccreavy)
        $(line).append("<button>Exit</button>");
      }
      if (1 || owner) { // TODO(mccreavy)
        $(line).append("<button>Start</button>");
      }
      $(this.container).append(line);
    }
  }

  window.dirg.GameListWidget = GameListWidget;
})();