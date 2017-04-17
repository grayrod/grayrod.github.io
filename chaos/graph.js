function GraphAnimation(divID, animationMode, paramsObject,
  bgColor, pxColor, pxGradientColor) {
  this.divID = divID;
  this.bgColor = bgColor;
  this.animationMode = animationMode;
  this.o = paramsObject;
  this.n = Math.floor(12500/(gl*gl*0.8)); // gl is a global variable
  this.px = {
    color: pxColor,
    gradientColor: pxGradientColor
  };
  this.s = { paused: false, looped: false, accelerated: false, zoomed: false, shuffle: true };
  this.zf = [ 10, 7, 4, 2.5, 1.8, 1.5, 1.2, 1.05, 0.9, 0.6, 0.4, 0.2, 0.1, 0.08,
    0.06, 0.04,0.02, 0.001, 0.0005, 0.0001, 0.0000001, 0.0000000001,
    0.0000000000001, 0.0000000000000001 ];
  this.timerWarp = 72;
  this.timerParticlePath = 36;
  var self = this;
  this.startWarpPath = function(clear) {
    self.intervalWarpPath = setInterval(function() {
        if (self.warp > self.warpMax) {
            self.restartAnimation();
        } else {
          self.warp = self.warp + self.warpRate;
          self.iterate();
          self.graph.px.future = self.map.points;
          // self.graph.setScale();
          self.graph.cumulate();
          self.graph.render(clear);
        }
    }, self.timerWarp);
  }
  this.stopWarpPath = function() {
    clearInterval(self.intervalWarpPath);
  }
  this.startParticlePath = function(clear) {
    self.intervalParticlePath = setInterval(function() {
      self.graph.px.time++;
      self.graph.cumulate();
      if (self.graph.px.time <= self.map.points.length
        && self.graph.px.time <= 500) {
        self.graph.update(clear);
      } else {
        self.restartAnimation();
      }
    }, self.timerParticlePath);
  }
  this.stopParticlePath = function() {
    clearInterval(self.intervalParticlePath);
  }
}

// Methods:

GraphAnimation.prototype.initialize = function() {
  this.setParams();
  this.iterate();
  this.draw();
  this.startAnimation();
}
GraphAnimation.prototype.refresh = function() {
  if (this.animationMode == "warpPath") {
    this.graph.redrawHistory("clear");
  } else if (this.animationMode == "warp"||this.animationMode == "particlePath") {
    this.graph.render("clear");
  }
}

GraphAnimation.prototype.setParams = function() {
  if (!this.s.looped) {
    if (this.s.shuffle) {
      this.o = randomKeyObject(randomKeyObject(parameters));
    }
    this.mappingFunc = this.o.map;
    this.a = this.o.a();
    this.b = this.o.b ? this.o.b : null;
    this.c = this.o.c ? this.o.c : null;
    this.d = this.o.d ? this.o.d : null;
    this.x0 = this.o.x0();
    this.y0 = this.o.y0();
    this.warpMax = this.o.warpMax;
    this.zi = this.o.zi();
    var color1 = gradients[colorKeys[randoInt(0,colorKeys.length-1)]];
    var color2 = gradients[color1.friends[randoInt(0,color1.friends.length-1)]];
    this.px.color = color1.rgb;
    this.px.gradientColor = color2.rgb;
    }
  if (!this.s.accelerated) {
    this.warpRate = this.o.warpRate;
  }
  if (!this.s.zoomed) {
    this.scale = this.zf[this.zi];
  }
  this.warp = this.o.warp;
}

GraphAnimation.prototype.render = function(clear) {
  this.iterate();
  this.graph.px.future = this.map.points;
  // self.graph.setScale();
  this.graph.cumulate();
  this.graph.render(clear);
}

GraphAnimation.prototype.iterate = function() {
  this.map = new IterativeMap(this.mappingFunc,{x0:this.x0, y0:this.y0,
    a:this.a, b:this.b, c:this.c, d:this.d, warp:this.warp}, this.n);
}

GraphAnimation.prototype.draw = function() {
  if (this.animationMode == "warp" || this.animationMode == "warpPath") {
    this.graph = new PixelGraph(this.divID, this.map.points, this.n, this.scale,
      this.bgColor, this.px.color, this.px.gradientColor);
  } else {
    this.graph = new PixelGraph(this.divID, this.map.points, 1, this.scale,
      this.bgColor, this.px.color, this.px.gradientColor);
  }
}

GraphAnimation.prototype.startAnimation = function() {
  if (this.animationMode == "warpPath") {
    this.startWarpPath();
  } else if (this.animationMode == "warp") {
    this.startWarpPath("clear");
  } else if (this.animationMode == "particlePath") {
    this.startParticlePath();
  } else if (this.animationMode == "particle") {
    this.startParticlePath("clear");
  }
}

GraphAnimation.prototype.restartAnimation = function() {
  this.stopAnimation();
  this.initialize();
}

GraphAnimation.prototype.stopAnimation = function() {
  if (this.animationMode == "warpPath"||this.animationMode == "warp") {
    this.stopWarpPath();
  } else {
    this.stopParticlePath();
  }
}
