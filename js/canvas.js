(function() {

  function Canvas(p) {
    this.dom = p.dom;
    this.context = this.dom.getContext("2d");
    this.width = $(this.dom).width();
    this.height = $(this.dom).height();
    this.clear = clear;
    this.context.translate(this.width/2, this.height/2);
    return this;
  };

  function clear() {

    this.context.fillStyle="#222222";
    this.context.fillRect(-this.width/2, -this.height/2,
                          this.width, this.height);
    this.context.strokeStyle="#666666";
    this.context.fillStyle="#00FF00";
    this.context.beginPath();
    this.context.moveTo(-this.width/2, 0);
    this.context.lineTo(this.width/2, 0);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0, -this.height/2);
    this.context.lineTo(0, this.height/2);
    this.context.stroke();
  }

  window.dirg.Canvas = Canvas;
})();