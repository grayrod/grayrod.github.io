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

var genSetRandom = {
  a: function(){return randoNum(-0.999,0.999);},
  b: 0.9850,
  bMax: 1.0020,
  bRate: 0.0001,
  x: function(){return randoInt(-3,-1);},
  y: function(){return randoInt(-10,10);},
  zi: 7
}

var genSet1 = {
  a: function(){return -0.03 + randoNum(0,0.02);},
  b: 0.9850,
  bMax: 1.0010,
  bRate: 0.0001,
  x: function(){return randoInt(-3,-1);},
  y: function(){return randoInt(-10,10);},
  zi: 7
}

var genSet2 = {
  a: function(){return 0.75 + randoFlip(2*(Math.random()/10) + 3*(Math.random()/100));},
  b: 0.95000,
  bMax: 0.95050,
  bRate: 0.00001,
  x: function(){return randoInt(0,20);},
  y: function(){return randoInt(0,4);},
  zi: 14
}
