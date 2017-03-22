function Graph( divID, paramsID, paramsObject, canvasColor, pixelStyle, pixelColorR, pixelColorG, pixelColorB ) {

  this.o = paramsObject;
  this.s = {
    paused: false,
    looped: false,
    accelerated: false
  };
  this.zf = [10, 7, 4, 2.5, 1.8, 1.5, 1.25, 1, 0.8, 0.5, 0.3, 0.15, 0.04, 0.01, 0.001];

  this.initialize = function() {
    this.newParams();
    this.setGraph();
  }

  this.newParams = function() {
    this.a = this.o.a();
    this.b = this.o.b;
    this.x = this.o.x();
    this.y = this.o.y();
    this.zi = this.o.zi;
    if (this.s.accelerated != true) {
      this.bm = this.o.bMax;
      this.br = this.o.bRate;
    }
    $( "#" + paramsID + " > p" ).html(this.a.toFixed(6) + "<br />" + this.x + " " + this.y);
  }

  this.setGraph = function() {
    this.scale = this.zf[this.zi];
    this.n = 6000;
    this.rate = 100;
    this.px = {
      style: pixelStyle,
      r: pixelColorR,
      g: pixelColorG,
      b: pixelColorB
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
    this.graph = new PixelGraph(this.divID, this.map.points, this.px.style, (this.map.minX*this.scale), (this.map.maxX*this.scale), (this.map.minY*this.scale), (this.map.maxY*this.scale), this.canvasColor, this.px.r, this.px.g, this.px.b);
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
