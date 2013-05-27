(function() {

  // date: 2013-05-26, author: mccreavy
  function BoardNode(p) {
    var o = {
      'size': p.size || 50,
      'margin': 2,
      'id': null,
      'hover': false,
      'position': { 'x': p.x, 'y': p.y },
      'neighbor': {},
      'addNeighbor': addNeighbor,
      'containsPoint': containsPoint,
      'render': render,
      'renderLabel': false
    };
    return o;
  };

  function containsPoint(position) {
    if (!position ||
      position.x < this.position.x * this.size ||
      position.x >= (this.position.x+1) * this.size ||
      position.y < this.position.y * this.size ||
      position.y >= (this.position.y+1) * this.size) {
      return false;
    }
    return true;
  }

  function addNeighbor(name, node) {
      this.neighbor[name] = node;
  }

  function render(canvas) {
      if (this.style == 'black') {
        canvas.context.fillStyle = '#222266';
      } else {
        canvas.context.fillStyle = '#8888AA';
      }
      canvas.context.strokeStyle = '#0000FF';

      if (this.connected) {
        canvas.context.fillStyle = "green";
      } else if (this.hover) {
        canvas.context.fillStyle = "yellow";
      }

      canvas.context.fillRect(
          (this.position.x * this.size) + this.margin,
          (this.position.y * this.size) + this.margin,
          this.size-this.margin*2,
          this.size-this.margin*2);
      canvas.context.strokeRect(
          (this.position.x * this.size) + this.margin,
          (this.position.y * this.size) + this.margin,
          this.size-this.margin*2,
          this.size-this.margin*2);
  }

  window.dirg.BoardNode = BoardNode;

})();