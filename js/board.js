(function() {

  // date: 2013-05-26, author: mccreavy
  function Board(p) {
    var o = {
      'node': [],
      'render': render,
      'update': update,
      'size': p.size || 50,
    };
    return o;
  };

  function update(cursor) {
    for (var i = 0 ; i < this.node.length ; i++) {
      this.node[i].connected = false;
    }
    for (var i = 0 ; i < this.node.length ; i++) {
      this.node[i].hover = this.node[i].containsPoint(cursor.position);
      if (this.node[i].hover) {
          for (x in this.node[i].neighbor) {
              this.node[i].neighbor[x].connected = true;
          }
      }
    }
  }

  function render(canvas) {
    // Render the nodes
    for (var i = 0 ; i < this.node.length ; i++) {
      this.node[i].render(canvas);
    }

    // Render the paths
//     if (1) {
//       canvas.context.strokeStyle = 'green';
//       for (var i = 0 ; i < this.node.length ; i++) {
//         //console.log("Neighbor count: " + this.node[i].neighbor.length);
//         var d = ['1', '2', '3', '4', '5', '6',
//                  'NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'];
//         for (var j = 0 ; j < d.length ; j++) {
//           if (d[j] in this.node[i].neighbor) {
//             canvas.context.beginPath();
//             canvas.context.moveTo(
//                 this.node[i].position.x,
//                 this.node[i].position.y
//             );
//             canvas.context.lineTo(
//                 this.node[i].neighbor[d[j]].position.x,
//                 this.node[i].neighbor[d[j]].position.y
//             );
//             canvas.context.stroke();
//           }
//         }
//       }
//     }
  }

  window.dirg.Board = Board;

})();