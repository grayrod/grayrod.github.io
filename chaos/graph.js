function GraphAnimation(divID, mappingFunc, animationMode, paramsObject,
  bgColor, pxColor, pxGradientColor) {

  this.divID = divID;
  this.bgColor = bgColor;
  this.mappingFunc = mappingFunc;
  this.animationMode = animationMode;
  // this.o = paramsObject == "shuffle" ? randoParams() : paramsObject;
  if (paramsObject == "shuffle") {
    this.o = randoParams();
  } else if (paramsObject == "randomMira") {
    this.o = randomSet("mira");
  } else if (paramsObject == "randomMiraPath") {
    this.o = randomMiraPath();
  } else if (paramsObject == "randomShield") {
    this.o = randomSet("shield");
  } else if (paramsObject == "randomShieldB") {
    this.o = randomSet("shieldB");
  } else if (paramsObject == "randomSquiggleF") {
    this.o = randomSet("squiggleF");
  } else {
    this.o = paramsObject;
  }
  this.n = Math.floor(10000/(gl*gl*0.8)); // gl is a global variable
  this.px = {
    color: pxColor,
    gradientColor: pxGradientColor
  };
  this.s = { paused: false, looped: false, accelerated: false };
  this.zf = [ 10, 7, 4, 2.5, 1.8, 1.5, 1.25, 1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.08,
    0.06, 0.04,0.02, 0.001, 0.0005, 0.0001, 0.0000001, 0.0000000001,
    0.0000000000001, 0.0000000000000001 ];
  this.timerWarp = 100;
  this.timerParticlePath = 36;
  this.timerParticle = 100;

  var self = this;
  this.startWarpPath = function() {
    self.intervalWarpPath = setInterval(function() {
        if (self.warp > self.warpMax) {
            self.restartAnimation();
        } else {
          self.warp = self.warp + self.warpRate;
          self.render();
        }
    }, self.timerWarp);
  }
  this.startWarp = function() {
    self.intervalWarp = setInterval(function() {
        if (self.warp > self.warpMax) {
            self.restartAnimation();
        } else {
          self.warp = self.warp + self.warpRate;
          self.render("clear");
        }
    }, self.timerWarp);
  }
  this.startParticlePath = function() {
    self.intervalParticlePath = setInterval(function() {
      self.graph.px.time++;
      self.graph.cumulate();
      if (self.graph.px.time <= self.map.points.length
        && self.graph.px.time <= 1000) {
        self.graph.update();
      } else {
        self.restartAnimation();
      }
    }, self.timerParticlePath);
  }
  this.startParticle = function() {
    self.intervalParticle = setInterval(function() {
      self.graph.px.time++;
      self.graph.cumulate();
      if (self.graph.px.time <= self.map.points.length
        && self.graph.px.time <= 500) {
        self.graph.update("clear");
      } else {
        self.restartAnimation();
      }
    }, self.timerParticle);
  }
  this.stopWarpPath = function() {
    clearInterval(self.intervalWarpPath);
  }
  this.stopWarp = function() {
    clearInterval(self.intervalWarp);
  }
  this.stopParticlePath = function() {
    clearInterval(self.intervalParticlePath);
  }
  this.stopParticle = function() {
    clearInterval(self.intervalParticle);
  }
}

// Methods:

GraphAnimation.prototype.setParams = function() {
  this.a = this.o.a();
  this.b = this.o.b ? this.o.b : null;
  this.c = this.o.c ? this.o.c : null;
  this.d = this.o.d ? this.o.d : null;
  this.warp = this.o.warp;
  this.x0 = this.o.x0();
  this.y0 = this.o.y0();
  this.zi = this.o.zi();
  this.scale = this.zf[this.zi];
  if (this.s.accelerated != true) {
    this.warpMax = this.o.warpMax;
    this.warpRate = this.o.warpRate;
  }
}

GraphAnimation.prototype.initialize = function() {
  this.setParams();
  this.iterate();
  this.draw();
  this.startAnimation();
}

GraphAnimation.prototype.render = function(clear) {
  this.iterate();
  this.graph.px.future = this.map.points;
  // self.graph.setScale();
  this.graph.cumulate();
  this.graph.render(clear);
}

GraphAnimation.prototype.refresh = function() {
  this.graph.prepare();
  this.graph.create();
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
    this.startWarp();
  } else if (this.animationMode == "particlePath") {
    this.startParticlePath();
  } else if (this.animationMode == "particle") {
    this.startParticle();
  }
}

GraphAnimation.prototype.restartAnimation = function() {
  this.stopAnimation();
  this.initialize();
}

GraphAnimation.prototype.stopAnimation = function() {
  if (this.animationMode == "warpPath") {
    this.stopWarpPath();
  } else if (this.animationMode == "warp") {
    this.stopWarp();
  } else if (this.animationMode == "particlePath") {
    this.stopParticlePath();
  } else if (this.animationMode == "particle") {
    this.stopParticle();
  }
}
