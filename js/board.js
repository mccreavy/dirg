(function() {

  // date: 2013-05-26, author: mccreavy
  function Board(p) {
    var o = {
      'node': [],
      'render': render
    };
    return o;
  };

  function render(canvas) {

    // Render the paths
    if (1) {
      canvas.context.strokeStyle = '#004400';
      for (var i = 0 ; i < this.node.length ; i++) {
        //console.log("Neighbor count: " + this.node[i].neighbor.length);
        var d = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'];
        for (var j = 0 ; j < d.length ; j++) {
          if (d[j] in this.node[i].neighbor) {
            canvas.context.beginPath();
            canvas.context.moveTo(
                this.node[i].position.x * 50,
                this.node[i].position.y * 50
            );
            canvas.context.lineTo(
                this.node[i].neighbor[d[j]].position.x * 50,
                this.node[i].neighbor[d[j]].position.y * 50
            );
            canvas.context.stroke();
          }
        }
      }
    }

    // Render the nodes
    for (var i = 0 ; i < this.node.length ; i++) {
      this.node[i].render(canvas);
    }
  }

  window.dirg.Board = Board;

})();