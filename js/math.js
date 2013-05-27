(function() {

  //function bisectPolar(p1,p2,a,b) {
  //  var x = toCartesian(p1);
  //  var y = toCartesian(p2);
  //  var z = toPolar(Point(x.x + (y.x-x.x)*a/b,
  //                                 x.y + (y.y-x.y)*a/b));
  //  return z;
  //}

  // date: 2013-05-19; author: mccreavy
  function toRadians(degrees) {
    return degrees * (Math.PI/180);
  }

  // date: 2013-05-19; author: mccreavy
  function toDegrees(radians) {
    return radians * (180/Math.PI);
  }

  // date: 2013-05-19; author: mccreavy
  function toCartesian(p) {
    var thetaRadians = toRadians(p.theta);
    return Point(polar.r * Math.cos(thetaRadians),
        polar.r * Math.sin(thetaRadians));
  }

  // date: 2013-05-19; author: mccreavy
  function toPolar(p) {
    var offset = point.x < 0 ? 180 : 0;
    return {
        'r': Math.sqrt(point.x*point.x+point.y*point.y),
        'theta': offset + math_toDegrees(Math.atan(point.y/point.x)),
    };
  }

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

  function MathClass() {
    return {
        //'bisect': bisect,
        'pointInPoly': pointInPoly,
        'toCartesian': toCartesian,
        'toDegrees': toDegrees,
        'toPolar': toPolar,
        'toRadians': toRadians
    };
  }
  window.dirg.Math = MathClass();
}());