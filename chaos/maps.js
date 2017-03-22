function MiraMap(a, b, x0, y0, iterations) {

  this.points = [];

  this.A = Number(a);
  this.B = Number(b);
  this.X = Number(x0);
  this.Y = Number(y0);
  this.C = 2 - 2*this.A;
  this.W = this.A*this.X + ((this.C*this.X*this.X)/(1 + this.X*this.X));
  this.I = 0;

  this.points.push({x:this.X,y:this.Y});

  while (this.I < iterations) {
    this.I++;
    this.Z = this.X;
    this.X = this.B*this.Y + this.W;
    this.U = this.X*this.X;
    this.W = this.A*this.X + ((this.C*this.U)/(1 + this.U));
    this.Y = this.W - this.Z;

    this.points.push({x:this.X,y:this.Y});
  }

  this.minY = Math.min.apply(null, this.points.map(function(o){return o.y;}));
  this.maxY = Math.max.apply(null, this.points.map(function(o){return o.y;}));

  this.minX = Math.min.apply(null, this.points.map(function(o){return o.x;}));
  this.maxX = Math.max.apply(null, this.points.map(function(o){return o.x;}));

}
