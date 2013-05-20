(function() {

  function Point(x, y) {
    this.x = x;
    this.y = y;
    this.rotate = function(d) {
        this.x *= Math.sin(d);
        this.y *= Math.cos(d);
    }
    return this;
  }

  window.dirg.Point = Point;
}());