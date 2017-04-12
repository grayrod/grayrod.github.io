var colors = {
  white: "rgb(255,255,255)",
  black: "rgb(0,0,0)",
  darkgray: "rgb(20,20,20)",
  gray: "rgb(66,66,66)",
  lime: "rgb(60,245,100)",
  leafyel: "rgb(200,240,50)",
  magenta: "rgb(241,0,241)",
  yellow: "rgb(204,204,0)",
  orange: "rgb(200,100,0)",
  tangerine: "rgb(255, 164, 116)",
  cyan: "rgb(0,212,217)",
  blue: "rgb(31, 117, 254)",
  blueblue: "rgb(0, 0, 255)"
}

var grays = {
  darkdarkdarkgray: "rgb(20,20,20)",
  darkdarkgray: "rgb(30,30,30)",
  darkgray: "rgb(40,40,40)",
  gray: "rgb(50,50,50)",
  graygray: "rgb(60,60,60)"
}

var gradients = {
  lime: {rgb:"rgb(60,245,100)", friends:["magenta", "purple"]},
  magenta: {rgb:"rgb(241,0,241)", friends:["yellow", "lime", "cyan"]},
  yellow: {rgb:"rgb(204,204,0)", friends:["magenta", "purple", "blue", "cyan", "red"]},
  orange: {rgb:"rgb(255,125,0)", friends:["cyan", "purple", "yellow", "red"]},
  cyan: {rgb:"rgb(0,212,217)", friends:["magenta", "purple", "yellow", "red"]},
  blue: {rgb:"rgb(31, 117, 254)", friends:["yellow", "red"]},
  purple: {rgb:"rgb(133, 53, 255)", friends:["yellow", "orange", "cyan"]},
  red: {rgb:"rgb(240, 25, 31)", friends:["yellow", "blue", "cyan"]}
}

var randomMiraPath = function() {
  var pathKeys = Object.keys(parameters.path);
  pathKeys.push("randomPath");
  pathKeys.push("randomPath");
  pathKeys.push("randomPath");
  var randoIndex = randoInt(0, pathKeys.length - 1);
  return parameters.path[pathKeys[randoIndex]];
}

var randomSet = function(a) {
  var pathKeys = Object.keys(parameters[a]);
  var randoIndex = randoInt(0, pathKeys.length - 1);
  return parameters[a][pathKeys[randoIndex]];
}

function randoParams() {
  var parametersKeys = Object.keys(gsets);
  var parametersLen = parametersKeys.length;
  var i = randoInt(0,parametersLen-1);
  var selectedParams = gsets[parametersKeys[i]];
  return selectedParams.param;
}

function shuffleSquiggleF() {
  var parametersKeys = Object.keys(parameters["squiggleF"]);
  var parametersLen = parametersKeys.length;
  var i = randoInt(0,parametersLen-1);
  var selectedParams = parameters["squiggleF"][parametersKeys[i]];
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

var parameters = {
  path: {
    randomPath: {
      name: "randomPath",
      a: function(){return randoNum(-0.9,0.9);},
      b: .9999,
      warp: .9999,
      warpMax: 1.00100,
      warpRate: 0.00001,
      x0: function(){return randoInt(1,10);},
      y0: function(){return randoInt(-10,10);},
      zi: function(){return 6;}
    },
    pathPixel: {
      name: "pathPixel",
      a: function(){return 0.99612 + randoNum(-0.1, 0.01);},
      b: 0.995,
      warp: 0.995,
      warpMax: 1.001,
      warpRate: 0.00001,
      x0: function(){return randoInt(0,10);},
      y0: function(){return randoInt(-10,-3);},
      zi: function(){return 6;}
    },
    pathThing: {
      name: "pathThing",
      a: function(){return 0.7 + randoNum(-0.015, 0.015);},
      b: 0.998,
      warp: 0.998,
      warpMax: 1.00500,
      warpRate: 0.0001,
      x0: function(){return 15;},
      y0: function(){return 0;},
      zi: function(){return 6;}
    },
    pathFlower: {
      name: "pathFlower",
      a: function(){return -0.609412 + randoNum(-0.3323, -0.0223);},
      // 0.758281
      b: 0.99900,
      warp: 0.99900,
      warpMax: 1.00100,
      warpRate: 0.0001,
      x0: function(){return -2;},
      y0: function(){return -5;},
      zi: function(){return 6;}
    }
  },

  shield: {
    lattices: {
      name: "lattices",
      a: function(){return Math.PI;},
      b: -Math.PI,
      warp: 1, // .99 makes more spirally things
      warpMax: 1.000,
      warpRate: 0.0000001,
      x0: function(){return randoNum(-.001,.001);},
      y0: function(){return randoNum(1,2);},
      zi: function(){return 6;}
    },
    paws: {
      name: "paws",
      a: function(){return randoNum(-2,-1);},
      b: 2,
      warp: 1, // .99 makes more spirally things
      warpMax: 1.000,
      warpRate: 0.0000001,
      x0: function(){return randoNum(-.001,.001);},
      y0: function(){return randoNum(1,2);},
      zi: function(){return 6;}
    },
    fractals: {
      name: "fractals",
      a: function(){return randoNum(0.89,.99);},
      b: -.9,
      warp: .99,
      warpMax: .999,
      warpRate: 0.00001,
      x0: function(){return randoNum(1.1,2.9);},
      y0: function(){return 6.54;},
      zi: function(){return 6;}
    }
  },

  shieldB: {
    // cloud: {
    //   name: "cloud",
    //   a: function(){return 3.5;},
    //   b: -3,
    //   warp: -3,
    //   warpMax: -3,
    //   warpRate: 0,
    //   x0: function(){return 3.21;},
    //   y0: function(){return 6.54;},
    //   zi: function(){return 6;}
    // },
    // cloud2: {
    //   name: "cloud2",
    //   a: function(){return 3.0;},
    //   b: -2.1,
    //   warp: -2.1,
    //   warpMax: -3,
    //   warpRate: 0,
    //   x0: function(){return 3.21;},
    //   y0: function(){return 6.54;},
    //   zi: function(){return 6;}
    // },
    honeycomb: {
      name: "honeycomb",
      a: function(){return 3.5;},
      b: -3,
      warp: 1,
      warpMax: 1.002,
      warpRate: 0.0001,
      x0: function(){return randoInt(3,4) + Math.random();},
      y0: function(){return randoInt(6,7) + Math.random();},
      zi: function(){return 4;}
    },
    swirls: {
      name: "swirls",
      a: function(){return 3.5;},
      b: -3,
      warp: .995,
      warpMax: 1.002,
      warpRate: 0.0001,
      x0: function(){return randoInt(3,4) + Math.random();},
      y0: function(){return randoInt(6,7) + Math.random();},
      zi: function(){return 4;}
    }
  },

  squiggle: {
    cloud4: {
      name: "cloud4",
      a: function(){return randoNum(0.97,1);},
      b: -3.0,
      warp: 0,
      warpMax: 0.2,
      warpRate: 0.001,
      x0: function(){return randoInt(-10,4) + Math.random();},
      y0: function(){return randoInt(0,20) + Math.random();},
      zi: function(){return 6;}
    },
    cloudWaves: {
      name: "cloudWaves",
      a: function(){return randoNum(0.97,1);},
      b: -3.0,
      warp: 0.1,
      warpMax: 0.2,
      warpRate: 0.001,
      x0: function(){return randoInt(-10,4) + Math.random();},
      y0: function(){return randoInt(0,20) + Math.random();},
      zi: function(){return 6;}
    }
  },

  squiggleF: {
    eyes: {
      name: "eyes",
      a: function(){return randoNum(1,2);},
      b: 0.900,
      warp: 1,
      warpMax: 2,
      warpRate: 0.01,
      x0: function(){return randoNum(-0.5,0);},
      y0: function(){return randoNum(-0.4,0.4);},
      zi: function(){return 6;}
    },
    sanddollar: {
      name: "sanddollar",
      a: function(){return randoNum(2,3);},
      b: 0.2341234,
      warp: 1,
      warpMax: 2,
      warpRate: 0.01,
      x0: function(){return randoNum(-0.5,0);},
      y0: function(){return randoNum(-0.4,0.4);},
      zi: function(){return 6;}
    },
    lopsided: {
      name: "lopsided",
      a: function(){return 10;},
      // a: function(){return randoNum(2,3);},
      b: .999,
      warp: 1,
      warpMax: 2,
      warpRate: 0.01,
      x0: function(){return randoNum(0,1);},
      y0: function(){return randoNum(0,1);},
      zi: function(){return 6;}
    },
    petals: {
      name: "petals",
      // a: function(){return 10;},
      a: function(){return randoNum(1,12);},
      b: .8,
      warp: 1,
      warpMax: 2,
      warpRate: 0.01,
      x0: function(){return randoNum(10,20);},
      y0: function(){return randoNum(13,15);},
      zi: function(){return 6;}
    },
    slowlines: {
      name: "slowlines",
      // a: function(){return 10;},
      a: function(){return randoNum(.001,.01);},
      b: .001,
      warp: 1,
      warpMax: 2,
      warpRate: 0.01,
      x0: function(){return randoNum(1,2);},
      y0: function(){return randoNum(1,2);},
      zi: function(){return 6;}
    },
    circles: {
      name: "circles",
      // a: function(){return 10;},
      a: function(){return randoNum(-.05,-.005);},
      b: .0001,
      warp: .98,  // less than 1 makes spirals.  greater than 1 inverted spiral
      warpMax: 1.1,
      warpRate: 0.001,
      x0: function(){return randoNum(.01,.1);},
      y0: function(){return randoNum(-.1,-.01);},
      zi: function(){return 3;}
    },
    crosses: {
      name: "crosses",
      // a: function(){return 10;},
      a: function(){return randoNum(-50,-40);},
      b: 0,
      warp: 1,
      warpMax: 2,
      warpRate: 0.01,
      // x0: function(){return 0;},
      // y0: function(){return randoNum(1,-.01);},
      x0: function(){return randoNum(.01,.1);},
      y0: function(){return randoNum(-.1,-.01);},
      zi: function(){return 6;}
    },
    mandala: {
      name: "mandala",
      // a: function(){return 10;},
      a: function(){return 1/0.666;},
      b: 0.666-(1/0.666),
      warp: 1,
      warpMax: 2,
      warpRate: 0.001,
      // x0: function(){return 0;},
      // y0: function(){return randoNum(1,-.01);},
      x0: function(){return randoNum(-2,-1);},
      y0: function(){return randoNum(1,2);},
      zi: function(){return 6;}
    }
  },

  mira: {
    random: {
      name: "random",
      a: function(){return randoNum(-0.999,0.999);},
      warp: 0.99500,
      warpMax: 1.00010,
      warpRate: 0.00001,
      x0: function(){return randoInt(-3,-1);},
      y0: function(){return randoInt(-10,10);},
      zi: function(){return 4;}
    },
    random2: {
      name: "random2",
      a: function(){return randoNum(-0.999,0.999);},
      warp: 0.99000,
      warpMax: 0.99500,
      warpRate: 0.00001,
      x0: function(){return randoInt(-3,-1);},
      y0: function(){return randoInt(-10,10);},
      zi: function(){return 5;}
    },
    random3: {
      name: "random3",
      a: function(){return randoNum(-0.0999,0.0999);},
      warp: 0.99900,
      warpMax: 0.99990,
      warpRate: 0.000001,
      x0: function(){return randoInt(-10,-1);},
      y0: function(){return randoInt(4,8);},
      zi: function(){return 4;}
    },
    fourOuterOrbits: {
      name: "fourOuterOrbits",
      a: function(){return -0.03123 + randoNum(0,0.02789) + randoFlip(2*Math.random()/100);},
      warp: 0.9400,
      warpMax: 1.0400,
      warpRate: 0.0005,
      x0: function(){return randoInt(-3,-1);},
      y0: function(){return randoInt(0,10);},
      zi: function(){return 7;}
    },
    innerOrbitA: {
      name: "innerOrbitA",
      a: function(){return 0.79204958 + randoFlip(2*(Math.random()/100) + 3*(Math.random()/1000));},
      warp: 0.95000,
      warpMax: 0.95500,
      warpRate: 0.00001,
      x0: function(){return randoInt(0,20);},
      y0: function(){return randoInt(0,4);},
      zi: function(){return randoInt(12,18);}
    },
    innerOrbitB: {
      name: "innerOrbitB",
      a: function(){return 0.8287473821 + randoFlip(3*(Math.random()/100)) + randoFlip(3*(Math.random()/100000));},
      warp: 0.99000,
      warpMax:  0.9900100,
      warpRate: 0.0000001,
      x0: function(){return randoInt(-4,4);},
      y0: function(){return randoInt(-4,4);},
      zi: function(){return randoInt(9,12);}
    },
    innerOrbitC: {
      name: "innerOrbitC",
      a: function(){return 0.904666 + randoFlip(1*(Math.random()/1000)) + randoFlip(3*(Math.random()/10000));},
      warp: 0.9700,
      warpMax: 0.9701,
      warpRate: 0.000001,
      x0: function(){return randoInt(-3,2);},
      y0: function(){return randoInt(1,20);},
      zi: function(){return randoInt(16,18);}
    },
    spaghettiA: {
      name: "spaghettiA",
      a: function(){return 0.994666 + randoFlip(1*(Math.random()/1000)) + randoFlip(3*(Math.random()/10000));},
      warp: 0.9700,
      warpMax: 0.9900,
      warpRate: 0.0001,
      x0: function(){return randoInt(-3,2);},
      y0: function(){return randoInt(0,4);},
      zi: function(){return randoInt(7,9);}
    },
    spaghettiB: {
      name: "spaghettiB",
      a: function(){return 0.988666 + randoFlip(1*(Math.random()/1000)) + randoFlip(3*(Math.random()/10000));},
      warp: 0.9450,
      warpMax: 0.9850,
      warpRate: 0.0005,
      x0: function(){return randoInt(1,7);},
      y0: function(){return randoInt(-2,2);},
      zi: function(){return 6;}
    },
    chugchug: {
      name: "chugchug",
      a: function(){return 0.899252 + randoNum(0.001,0.01);},
      warp: 0.9850,
      warpMax: 1.0020,
      warpRate: 0.00005,
      x0: function(){return -1;},
      y0: function(){return -10;},
      zi: function(){return randoInt(7,14);},
    },
    flower: {
      name: "flower",
      a: function(){return -0.399412;},
      warp: 0.99000,
      warpMax: 1.00100,
      warpRate: 0.0001,
      x0: function(){return -1;},
      y0: function(){return -5;},
      zi: function(){return 6;}
    },
    elevenPistons: {
      name: "elevenPistons",
      a: function(){return 0.832631 + randoNum(0.0001,0.001);},
      warp: 0.9870,
      warpMax:  1.0050,
      warpRate: 0.00005,
      x0: function(){return randoInt(2,4);},
      y0: function(){return randoInt(-5,-1);},
      zi: function(){return 7;}
    },
    eightPistons: {
      name: "eightPistons",
      a: function(){return 0.757860 + randoNum(0.0001,0.001);},
      warp: 0.9870,
      warpMax:  1.0050,
      warpRate: 0.00005,
      x0: function(){return randoInt(-3,-1);},
      y0: function(){return randoInt(5,10);},
      zi: function(){return randoInt(6,8);}
    },
    twentyPistons: {
      name: "twentyPistons",
      a: function(){return 0.583418 + randoFlip(randoNum(0.00001,0.0001));},
      warp: 0.99900,
      warpMax:  1.00100,
      warpRate: 0.00001,
      x0: function(){return randoInt(-4,-2);},
      y0: function(){return randoInt(-9,-6);},
      zi: function(){return randoInt(6,8);}
    },
    fourteenPistons: {
      name: "fourteenPistons",
      a: function(){return -0.624116 + randoFlip(randoNum(0.00001,0.0001));},
      warp: 0.99900,
      warpMax:  1.00100,
      warpRate: 0.00001,
      x0: function(){return randoInt(-3,0);},
      y0: function(){return randoInt(5,8);},
      zi: function(){return randoInt(6,8);}
    },
    eyeTwitch: {
      name: "eyeTwitch",
      a: function(){return 0.09191817161514321 + randoFlip(randoNum(0.01,0.001));},
      warp: 0.99000,
      warpMax:  1.00006,
      warpRate: 0.00005,
      x0: function(){return randoInt(0,30);},
      y0: function(){return randoInt(50,80);},
      zi: function(){return randoInt(6,8);}
    },
    fiveFeathers: {
      name: "fiveFeathers",
      a: function(){return -0.8069 + randoFlip(randoNum(0.0001,0.001));},
      warp: 0.8000,
      warpMax:  1.0000,
      warpRate: 0.005,
      x0: function(){return randoInt(0,1);},
      y0: function(){return randoInt(8,9);},
      zi: function(){return randoInt(5,6);}
    },
    blades: {
      name: "blades",
      a: function(){return -0.7020 + randoFlip(randoNum(0.001,0.01));},
      warp: 0.9800,
      warpMax:  0.9805,
      warpRate: 0.00001,
      x0: function(){return randoInt(-5,-3);},
      y0: function(){return randoInt(-10,-5);},
      zi: function(){return 6;}
    },
    thing: {
      name: "thing",
      a: function(){return 0.6666666666 + randoFlip(randoNum(0.0001,0.001));},
      warp: 0.8000,
      warpMax:  1.0000,
      warpRate: 0.001,
      x0: function(){return randoInt(1,3);},
      y0: function(){return randoInt(-9,9);},
      zi: function(){return 9;}
    }
  }
}
