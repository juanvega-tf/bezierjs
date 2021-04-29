"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bezier = void 0;

const Bezier = function (start, startControl, endControl, end) {
  if (!start || !startControl || !endControl || !end) {
    throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
  }

  let points = [start, startControl, endControl, end];
  let _lut = [];
  return {
    getLUT(steps) {
      steps = steps || 100;

      if (_lut.length === steps) {
        return _lut;
      }

      _lut = []; // We want a range from 0 to 1 inclusive, so
      // we decrement and then use <= rather than <:

      steps--;

      for (let i = 0, p, progression; i < steps; i++) {
        // progression is the relative value between the starting point and the final point, start from 0 and ending at 1
        progression = i / (steps - 1);
        p = compute(progression, points);
        p.t = progression;

        _lut.push(p);
      }

      return _lut;
    }

  };
};

exports.Bezier = Bezier;

const compute = function (progression, points) {
  // shortcuts
  if (progression === 0) {
    points[0].t = 0;
    return points[0];
  }

  const order = points.length - 1;

  if (progression === 1) {
    points[order].t = 1;
    return points[order];
  }

  const mt = 1 - progression;
  let p = points; // quadratic/cubic curve?

  if (order < 4) {
    let mt2 = mt * mt,
        t2 = progression * progression,
        a,
        b,
        c,
        d = 0;

    if (order === 3) {
      a = mt2 * mt;
      b = mt2 * progression * 3;
      c = mt * t2 * 3;
      d = progression * t2;
    }

    return {
      x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
      y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
      t: progression
    };
  }
};
