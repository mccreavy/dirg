(function() {

  // date: 2013-05-26, author: mccreavy
  function BoardNode(p) {
    var o = {
      'id': null,
      'position': { 'x': p.x, 'y': p.y },
      'neighbor': {},
      'addNeighbor': addNeighbor,
      'render': render
    };
    return o;
  };

  function addNeighbor(name, node) {
      this.neighbor[name] = node;
  }

  function render(canvas) {
      if (this.style == 'black') {
        canvas.context.fillStyle = '#000000';
      } else {
        canvas.context.fillStyle = '#FFFFFF';
      }
      canvas.context.strokeStyle = '#FFFFFF';

      canvas.context.fillRect(
          (this.position.x * 50) - 15,
          (this.position.y * 50) - 15, 30, 30);
      canvas.context.strokeRect(
          (this.position.x * 50) - 15,
          (this.position.y * 50) - 15, 30, 30);
  }

  window.dirg.BoardNode = BoardNode;

})();