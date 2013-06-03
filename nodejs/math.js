
var MMath = {
  'pointInPoly': pointInPoly
};

// date: 2013-05-19; author: mccreavy
function pointInPoly(poly, point) {
  var i, j = poly.length - 1;
  var inPoly = false;
  var x = point.x;
  var y = point.y;

  for (i=0; i<poly.length; i++) {
    if (poly[i].y<y && poly[j].y>=y || poly[j].y<y && poly[i].y>=y) {
      if (poly[i].x+(y-poly[i].y)/(poly[j].y-poly[i].y)
          *(poly[j].x-poly[i].x)<x) {
        inPoly=!inPoly;
      }
    }
    j=i;
  }
  return inPoly;
}

module.exports.MMath = MMath;