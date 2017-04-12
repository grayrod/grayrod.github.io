function IterativeMap(f,o,n) {
  this.o = o;
  this.n = n;
  this.points = f(this.o,this.n);
}

function gumMira(o,n) {
  var x0 = o.x0;
  var y0 = o.y0;
  var a = o.a;
  var warp = o.warp;
  var results = [{x:x0, y:y0}];
  for (var i=0; i < n; i++) {
    var x1 = (warp * y0) + F(x0);
    var y1 = F(x1) - x0;
    results.push({x:x1, y:y1});
    x0 = x1;
    y0 = y1;
  }
  return results;

  function F(x) {
    var c = 2 - (2 * a);
    var u = x * x;
    return (a * x) + ((c * u) / (1 + u));
  }
}

function shield(o,n) {
  var x0 = o.x0;
  var y0 = o.y0;
  var a = o.a;
  var b = o.b;
  var warp = o.warp;
  var results = [{x:x0, y:y0}];
  for (var i=0; i < n; i++) {
    var x1 = warp * y0 + F(x0);
    var y1 = F(x1) - x0;
    results.push({x:x1, y:y1});
    x0 = x1;
    y0 = y1;
  }
  return results;

  function F(x) {
    if (x > 1) {
      return (a * x) + b * (x - 1);
    } else if (x < -1) {
      return (a * x) + b * (x + 1);
    } else {
      return Math.cos(a * x);
    }
  }
}

function shieldB(o,n) {
  var x0 = o.x0;
  var y0 = o.y0;
  var a = o.a;
  var b = o.b;
  var warp = o.warp;
  var results = [{x:x0, y:y0}];
  for (var i=0; i < n; i++) {
    var x1 = y0 + F(x0);
    var y1 = F(x1) - warp * x0;
    results.push({x:x1, y:y1});
    x0 = x1;
    y0 = y1;
  }
  return results;

  function F(x) {
    if (x > 1) {
      return (a * x) + b * (x - 1);
    } else if (x < -1) {
      return (a * x) + b * (x + 1);
    } else {
      return a * x;
    }
  }
}

function squiggle(o,n) {
  var x0 = o.x0;
  var y0 = o.y0;
  var a = o.a;
  var b = o.b;
  var warp = o.warp;
  var results = [{x:x0, y:y0}];
  for (var i=0; i < n; i++) {
    var x1 = (warp + y0) + F(x0);
    var y1 = F(x1) - x0;
    results.push({x:x1, y:y1});
    x0 = x1;
    y0 = y1;
  }
  return results;

  function F(x) {
    return (a * x) + (b * Math.sin(x));
  }
}

function squiggleWaves(o,n) {
  var x0 = o.x0;
  var y0 = o.y0;
  var a = o.a;
  var b = o.b;
  var warp = o.warp;
  var results = [{x:x0, y:y0}];
  for (var i=0; i < n; i++) {
    var x1 = (warp - y0) + F(x0);
    var y1 = F(x1) - x0;
    results.push({x:x1, y:y1});
    x0 = x1;
    y0 = y1;
  }
  return results;

  function F(x) {
    return (a * x) + (b * Math.sin(x));
  }
}

function squiggleB(o,n) {
  var x0 = o.x0;
  var y0 = o.y0;
  var a = o.a;
  var b = o.b;
  var warp = o.warp;
  var results = [{x:x0, y:y0}];
  for (var i=0; i < n; i++) {
    var x1 = y0 + F(x0);
    var y1 = F(x1) - x0;
    results.push({x:x1, y:y1});
    x0 = x1;
    y0 = y1;
  }
  return results;

  function F(x) {
    return a + (b * Math.sin(x));
  }
}

function squiggleF(o,n) {
  var x0 = o.x0;
  var y0 = o.y0;
  var a = o.a;
  var b = o.b;
  var warp = o.warp;
  var results = [{x:x0, y:y0}];
  for (var i=0; i < n; i++) {
    var x1 = warp * y0 + F(x0);
    var y1 = F(x1) - x0;
    results.push({x:x1, y:y1});
    x0 = x1;
    y0 = y1;
  }
  return results;

  function F(x) {
    if (Math.abs(x) < 1) {
      return (a * x);
    } else {
      return (b * x) + (a - b)/x;
    }
  }
}
