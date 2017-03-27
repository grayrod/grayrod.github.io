function Graph( divID, paramsID, paramsObject, canvasColor, pixelStyle, pixelColor ) {

  if (paramsObject == "shuffle") {
    this.o = randoParams();
  } else {
    this.o = parameters[paramsObject];
  }
  this.s = {
    paused: false,
    looped: false,
    accelerated: false
  };
  this.zf = [10, 7, 4, 2.5, 1.8, 1.5, 1.25, 1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.08, 0.06, 0.04, 0.02, 0.001, 0.0005, 0.0001, 0.0000001, 0.0000000001, 0.0000000000001, 0.0000000000000001];

  this.initialize = function() {
    this.newParams();
    this.setGraph();
  }

  this.newParams = function() {
    if (paramsObject == "shuffle") {
      this.o = randoParams();
    }
    this.a = this.o.a();
    this.b = this.o.b;
    this.x = this.o.x();
    this.y = this.o.y();
    this.zi = this.o.zi();
    if (this.s.accelerated != true) {
      this.bm = this.o.bMax;
      this.br = this.o.bRate;
    }
    $( "#" + paramsID + " > p" ).html(this.a.toFixed(6) + "<br />" + this.x + " " + this.y);
    console.log(divID + ": " + JSON.stringify(this.o) + "\n a:" + this.a + "\n x:" + this.x + "\n y:" + this.y + "\n zi:" + this.zi);
  }

  this.setGraph = function() {
    this.scale = this.zf[this.zi];
    this.n = 3000;
    this.rate = 100;
    this.px = {
      style: pixelStyle,
      color: pixelColor
    };
    this.divID = divID;
    this.canvasColor = canvasColor;
  }

  this.start = function() {
    this.render();
    this.resume();
  }

  this.render = function() {
    this.iterate();
    this.draw();
  }

  this.iterate = function() {
    this.map = new MiraMap(this.a, this.b, this.x, this.y, this.n);
  }

  this.draw = function() {
    this.graph = new PixelGraph(this.divID, this.map.points, this.px.style, (this.map.minX*this.scale), (this.map.maxX*this.scale), (this.map.minY*this.scale), (this.map.maxY*this.scale), this.canvasColor, this.px.color);
  }

  var self = this;

  this.resume = function() {
    self.timer = setInterval(function() {
        if (self.b > self.bm) {
          self.stop();
          if (self.s.looped == false) {
            self.newParams();
          } else {
            self.b = self.o.b;
          }
          self.start();
        } else {
          self.b = self.b + self.br;
          self.render();
        }
    }, self.rate);
  }

  this.stop = function() {
    clearInterval(self.timer);
  }

}
