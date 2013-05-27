(function() {
  function Cursor(p) {
    var o = {
      'position': null,
      'render': render
    };
    return o;
  }
  var v = 0;
  function render(canvas) {
    if (!this.position) {
      return;
    }

    canvas.context.strokeStyle = "yellow";
    canvas.context.beginPath();
    canvas.context.moveTo(this.position.x, -canvas.height/2);
    canvas.context.lineTo(this.position.x, canvas.height/2);
    canvas.context.stroke();
    canvas.context.beginPath();
    canvas.context.moveTo(-canvas.width/2, this.position.y);
    canvas.context.lineTo(canvas.width/2, this.position.y);
    canvas.context.stroke();

    canvas.context.fillStyle = "#FF0000";
    canvas.context.beginPath();
    canvas.context.arc(this.position.x, this.position.y,5, 2*Math.PI, false);
    canvas.context.fill();
  }

  window.dirg.Cursor = Cursor;
})();