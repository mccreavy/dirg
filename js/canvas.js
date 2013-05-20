(function() {

  function Canvas(p) {
    this.dom = p.dom;
    this.context = this.dom.getContext("2d");
    this.width = $(this.dom).width();
    this.height = $(this.dom).height();

    this.context.strokeStyle="#666666";
    this.context.fillStyle="#00FF00";
    this.context.translate(this.width/2, this.height/2);
    this.context.beginPath();
    this.context.moveTo(-this.width/2, 0);
    this.context.lineTo(this.width/2, 0);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0, -this.height/2);
    this.context.lineTo(0, this.height/2);
    this.context.stroke();

    return this;
  };

  window.dirg.Canvas = Canvas;
}());