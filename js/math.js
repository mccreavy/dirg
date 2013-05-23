(function() {

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

  function MathClass() {
    return {
        'toCartesian': toCartesian,
        'toDegrees': toDegrees,
        'toPolar': toPolar,
        'toRadians': toRadians
    };
  }
  window.dirg.Math = MathClass();
}());