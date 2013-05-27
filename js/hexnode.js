(function() {

  // date: 2013-05-26, author: mccreavy
  function HexNode(p) {
    var o = dirg.BoardNode(p);
    o.render = render;
    o.containsPoint = containsPoint;
    return o;
  };

  function containsPoint(position) {
    var poly = [];
    for (var i = 0 ; i < 6 ; i++) {
      var x = Math.cos(Math.PI*2/6*(i))*(this.size-1); // -1 for margins
      var y = Math.sin(Math.PI*2/6*(i))*(this.size-1); // -1 for margins
      poly[i] = { x: this.position.x + x, y: this.position.y + y };
    }

    return dirg.Math.pointInPoly(poly, position);
  }

  function render(canvas) {
    if (this.connected) {
      canvas.context.fillStyle = "green";
    } else if (this.hover) {
      canvas.context.fillStyle = "yellow";
    } else {
      canvas.context.fillStyle = "#FF00FF";
    }
    canvas.context.arc(this.position.x, this.position.y, 3, 2*Math.PI, false);
    canvas.context.strokeStyle = "#FF88FF";
    canvas.context.beginPath();
    for (var i = 0 ; i < 6 ; i++) {
      var x = Math.cos(Math.PI*2/6*(i))*(this.size-1); // -1 for margins
      var y = Math.sin(Math.PI*2/6*(i))*(this.size-1); // -1 for margins
      if (i == 0) {
        canvas.context.moveTo(this.position.x + x, this.position.y + y);
      } else {
        canvas.context.lineTo(this.position.x + x, this.position.y + y);
      }
    }
    canvas.context.fill();
    canvas.context.strokeStyle = "#FFFFFF";

    if (this.renderLabel) {
      var metrics = canvas.context.measureText(this.id);
      canvas.context.strokeText(this.id,
          this.position.x - metrics.width/2,
          this.position.y);
      var msg = (this.position.x|0) + "," + (this.position.y|0);
      metrics = canvas.context.measureText(msg);
      canvas.context.strokeText(msg,
          this.position.x - metrics.width/2,
          this.position.y + 10);
    }

    /*
    canvas.context.strokeStyle = "blue";
    canvas.context.beginPath();
    for (var i = 0 ; i < 6 ; i++) {
      var x = Math.sin(Math.PI*2/6*i)*(this.size*1.25); // sin instead of cos
      var y = Math.cos(Math.PI*2/6*i)*(this.size*1.25); // cos instead of sin
      if (i == 0) {
        canvas.context.moveTo(this.position.x + x, this.position.y + y);
      } else {
        canvas.context.lineTo(this.position.x + x, this.position.y + y);
      }
    }
    canvas.context.stroke();
    canvas.context.strokeText(this.id,
        this.position.x - metrics.width/2,
        this.position.y);
    */

  }

  window.dirg.HexNode = HexNode;

})();