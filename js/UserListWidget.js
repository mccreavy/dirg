(function() {

  // date: 2013-07-08, author: mccreavy
  function UserListWidget(p) {
    var o = {
      'container': p.container,
      'render': render
    };
    return o;
  };

  function render(userList) {
    $(this.container).empty();
    if (!userList) {
      return;
    }
    for (var i in userList) {
      var line = $("<p>" + userList[i].id + "," + userList[i].name + "</p>");
      var message = $("<button>Message</button>");
      message.click(function() {
        client.message(userList[i].id, "fooobarr");
      });
      $(line).append(message);
      $(this.container).append(line);
    }
  }

  window.dirg.UserListWidget = UserListWidget;
})();