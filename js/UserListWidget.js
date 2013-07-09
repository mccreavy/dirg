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
      $(this.container).append("<p>USER:" + userList[i].id + "," +
          userList[i].name + "</p>");
    }
  }

  window.dirg.UserListWidget = UserListWidget;
})();