var colors = {

  white: "rgb(255,255,255)",
  black: "rgb(0,0,0)",
  darkgray: "rgb(20,20,20)",
  lime: "rgb(60,245,100)",
  magenta: "rgb(241,0,241)",
  yellow: "rgb(204,204,0)",
  cyan: "rgb(0,212,217)"

}

var parameters = {

  random:

  {
    name: "random",
    a: function(){return randoNum(-0.999,0.999);},
    b: 0.99800,
    bMax: 1.00010,
    bRate: 0.00001,
    x: function(){return randoInt(-3,-1);},
    y: function(){return randoInt(-10,10);},
    zi: function(){return 7;}
  },

  fourOuterOrbits:

  {
    name: "fourOuterOrbits",
    a: function(){return -0.03123 + randoNum(0,0.02789) + randoFlip(2*Math.random()/100);},
    b: 0.9400,
    bMax: 1.0400,
    bRate: 0.0005,
    x: function(){return randoInt(-3,-1);},
    y: function(){return randoInt(0,10);},
    zi: function(){return 7;}
  },

  innerOrbitA:

  {
    name: "innerOrbitA",
    a: function(){return 0.79204958 + randoFlip(2*(Math.random()/100) + 3*(Math.random()/1000));},
    b: 0.95000,
    bMax: 0.95500,
    bRate: 0.00001,
    x: function(){return randoInt(0,20);},
    y: function(){return randoInt(0,4);},
    zi: function(){return randoInt(12,18);}
  },

  innerOrbitB:

  {
    name: "innerOrbitB",
    a: function(){return 0.8287473821 + randoFlip(3*(Math.random()/100)) + randoFlip(3*(Math.random()/100000));},
    b: 0.99000,
    bMax:  0.9900100,
    bRate: 0.0000001,
    x: function(){return randoInt(-4,4);},
    y: function(){return randoInt(-4,4);},
    zi: function(){return randoInt(9,12);}
  },

  innerOrbitC:

  {
    name: "innerOrbitC",
    a: function(){return 0.904666 + randoFlip(1*(Math.random()/1000)) + randoFlip(3*(Math.random()/10000));},
    b: 0.9700,
    bMax: 0.9701,
    bRate: 0.000001,
    x: function(){return randoInt(-3,2);},
    y: function(){return randoInt(1,20);},
    zi: function(){return randoInt(16,18);}
  },

  spaghettiA:

  {
    name: "spaghettiA",
    a: function(){return 0.994666 + randoFlip(1*(Math.random()/1000)) + randoFlip(3*(Math.random()/10000));},
    b: 0.9700,
    bMax: 0.9900,
    bRate: 0.0001,
    x: function(){return randoInt(-3,2);},
    y: function(){return randoInt(0,4);},
    zi: function(){return randoInt(10,19);}
  },

  spaghettiB:

  {
    name: "spaghettiB",
    a: function(){return 0.995666 + randoFlip(1*(Math.random()/1000)) + randoFlip(3*(Math.random()/10000));},
    b: 0.9500,
    bMax: 1.0500,
    bRate: 0.0005,
    x: function(){return randoInt(1,7);},
    y: function(){return randoInt(-2,2);},
    zi: function(){return 6;}
  },

  boom:

  {
    name: "chugchug",
    a: function(){return 0.899252 + randoNum(0.001,0.01);},
    b: 0.9850,
    bMax: 1.0020,
    bRate: 0.00005,
    x: function(){return -1;},
    y: function(){return -10;},
    zi: function(){return randoInt(7,14);},
  },

  flower:

  {
    name: "flower",
    a: function(){return -0.309412;},
    b: 0.99000,
    bMax: 1.00100,
    bRate: 0.0001,
    x: function(){return -2;},
    y: function(){return -5;},
    zi: function(){return 6;}
  },

  elevenPistons:
  {
    name: "elevenPistons",
    a: function(){return 0.832631 + randoNum(0.0001,0.001);},
    b: 0.9870,
    bMax:  1.0050,
    bRate: 0.00005,
    x: function(){return randoInt(2,4);},
    y: function(){return randoInt(-5,-1);},
    zi: function(){return 7;}
  },

  eightPistons:
  {
    name: "eightPistons",
    a: function(){return 0.757860 + randoNum(0.0001,0.001);},
    b: 0.9870,
    bMax:  1.0050,
    bRate: 0.00005,
    x: function(){return randoInt(-3,-1);},
    y: function(){return randoInt(5,10);},
    zi: function(){return randoInt(6,8);}
  },

  twentyPistons:
  {
    name: "twentyPistons",
    a: function(){return 0.583418 + randoFlip(randoNum(0.00001,0.0001));},
    b: 0.99900,
    bMax:  1.00100,
    bRate: 0.00001,
    x: function(){return randoInt(-4,-2);},
    y: function(){return randoInt(-9,-6);},
    zi: function(){return randoInt(6,8);}
  },

  fourteenPistons:
  {
    name: "fourteenPistons",
    a: function(){return -0.624116 + randoFlip(randoNum(0.00001,0.0001));},
    b: 0.99900,
    bMax:  1.00100,
    bRate: 0.00001,
    x: function(){return randoInt(-3,0);},
    y: function(){return randoInt(5,8);},
    zi: function(){return randoInt(6,8);}
  },

  fiveFeathers:
  {
    name: "fiveFeathers",
    a: function(){return -0.8069 + randoFlip(randoNum(0.0001,0.001));},
    b: 0.8000,
    bMax:  1.0000,
    bRate: 0.005,
    x: function(){return randoInt(0,1);},
    y: function(){return randoInt(8,9);},
    zi: function(){return randoInt(5,6);}
  },

  blades:
  {
    name: "blades",
    a: function(){return -0.7020 + randoFlip(randoNum(0.001,0.01));},
    b: 0.9800,
    bMax:  0.9805,
    bRate: 0.00001,
    x: function(){return randoInt(-5,-3);},
    y: function(){return randoInt(-10,-5);},
    zi: function(){return 6;}
  },

  thing:
  {
    name: "thing",
    a: function(){return 0.6666666666 + randoFlip(randoNum(0.0001,0.001));},
    b: 0.8000,
    bMax:  1.0000,
    bRate: 0.001,
    x: function(){return randoInt(1,3);},
    y: function(){return randoInt(-9,9);},
    zi: function(){return 9;}
  }

}


function randoParams() {
  var parametersKeys = Object.keys(parameters);
  var parametersLen = parametersKeys.length;
  var i = randoInt(0,parametersLen-1);
  var selectedParams = parameters[parametersKeys[i]];
  return selectedParams;
}

function randoNum(min, max) {
  return Math.random() * (max - min) + min;
}

function randoInt(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randoFlip(a) {
  let sign = Math.random();
  if (Math.round(sign) == 0) {
    return -a;
  } else {
    return a;
  }
}
