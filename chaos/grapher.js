function PixelGraph(divID,data,time,scale,bgColor,pxColor,pxGradientColor) {
	this.divID = divID;
	this.targetDiv = $( "#"+this.divID );
	this.px = {
		future: data,
		time: time,
		now: [data[time]],
		history: [],
		color1: pxColor ? pxColor : "rbg(0,0,0)",
		color2: pxGradientColor ? pxGradientColor : "rbg(255,255,255)",
	};
	this.scale = scale ? scale: 1;
	this.bgColor = bgColor ? bgColor : "rbg(255,255,255)";
	this.gradient = this.createGradient(this.px.color1, this.px.color2, 9);

	this.prepare();
	this.create();
}

PixelGraph.prototype.prepare = function() {
	this.setScale();
  this.cumulate();
}

PixelGraph.prototype.cumulate = function() {
	this.px.history = this.px.future.slice(0,this.px.time);
	this.px.now = [this.px.history[this.px.history.length - 1]];
}

PixelGraph.prototype.setScale = function() {
	this.xMin = this.scale * Math.min.apply(null, this.px.future.map(
		function(o){return o.x;}));
	this.xMax = this.scale * Math.max.apply(null, this.px.future.map(
		function(o){return o.x;}));
	this.yMin = this.scale * Math.min.apply(null, this.px.future.map(
		function(o){return o.y;}));
	this.yMax = this.scale * Math.max.apply(null, this.px.future.map(
		function(o){return o.y;}));
}

PixelGraph.prototype.setSize = function() {
	this.divW = this.targetDiv.width();
	this.divH = this.targetDiv.height();
}

PixelGraph.prototype.create = function( event ) {
	if (this.canvas) {this.canvas.remove();}
	this.setSize();
	this.canvas = $("<canvas width='"+this.divW+"' height='"+this.divH+"' />");
	this.targetDiv.html( this.canvas );

	var ctx = this.canvas[0].getContext("2d");
	ctx.fillStyle = this.bgColor;
	ctx.fillRect(0, 0, this.divW, this.divH);

	this.render();
}

PixelGraph.prototype.width = function() {
	return this.targetDiv.width();
}

PixelGraph.prototype.height = function() {
	return this.targetDiv.height();
}

PixelGraph.prototype.render = function(clear) {
	var ctx = this.canvas[0].getContext("2d");
	if (clear) {
		ctx.fillStyle = this.bgColor;
		ctx.fillRect(0, 0, this.divW, this.divH);
	}
 	var imageData = ctx.getImageData(0, 0, this.divW, this.divH);
	var xDiff = this.xMax - this.xMin;
	var yDiff = this.yMax - this.yMin
	var x;
	var y;
	var o;
	for (var i=0; i < this.px.history.length; i++) {
		o = this.px.history[i];
		x = (o.x - this.xMin) / xDiff;
		y = (o.y - this.yMin) / yDiff;
		x = parseInt(x * this.divW);
		y = parseInt(y * this.divH);
		if (x > 0 && x < this.divW && y > 0 && y < this.divH) {
			this.scalePixel(i, x, y, imageData);
		}
	}
	ctx.putImageData(imageData, 0, 0);
}

PixelGraph.prototype.update = function(clear) {
	var ctx = this.canvas[0].getContext("2d");
	if (clear) {
		ctx.fillStyle = this.bgColor;
		ctx.fillRect(0, 0, this.divW, this.divH);
	}
 	var imageData = ctx.getImageData(0, 0, this.divW, this.divH);
	var xDiff = this.xMax - this.xMin;
	var yDiff = this.yMax - this.yMin
	var x;
	var y;
	var o;
	var newLen = this.px.history.length
	o = this.px.history[newLen - 1];
	x = (o.x - this.xMin) / xDiff;
	y = (o.y - this.yMin) / yDiff;
	x = parseInt(x * this.divW);
	y = parseInt(y * this.divH);
	if (x > 0 && x < this.divW && y > 0 && y < this.divH) {
    var i = newLen;
		this.scalePixel(i, x, y, imageData);
	}
	ctx.putImageData(imageData, 0, 0);
}

PixelGraph.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
  index = Math.abs((x + y * imageData.width) * 4);
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}

PixelGraph.prototype.shape = function(c, d, x, y, imageData, r, g, b, a) {
	this.setPixel(imageData, x, y, r, g, b, a);
	// c = 5, d = 4
	var cc = (c - 1) / 2;
	// draw a cross of length c:
	for (var i = 1; i <= cc; i++) {
		this.setPixel(imageData, x, y+i, r, g, b, a);
		this.setPixel(imageData, x, y-i, r, g, b, a);
		this.setPixel(imageData, x+i, y, r, g, b, a);
		this.setPixel(imageData, x-i, y, r, g, b, a);
	}
	// draw pixels in each quadrant
	var dd = d - 2;
	for (var i = 1; i <= dd; i++) {
		if (i % 2 !== 0) { // odd numbers always draw 1 pixel in each quadrant
			var ii = (i + 1) / 2;  // 1 -> 1,  3 -> 2,  5 -> 3 ...
			this.setPixel(imageData, x+ii, y+ii, r, g, b, a);
			this.setPixel(imageData, x+ii, y-ii, r, g, b, a);
			this.setPixel(imageData, x-ii, y+ii, r, g, b, a);
			this.setPixel(imageData, x-ii, y-ii, r, g, b, a);
		} else {
			var ii = (i / 2) + 1;   // 2 -> 2, 4 -> 3, 6 -> 4
			for (var j = 1; j < ii; j++) {
				this.setPixel(imageData, x+j, y+ii, r, g, b, a);
				this.setPixel(imageData, x+ii, y+j, r, g, b, a);

				this.setPixel(imageData, x+j, y-ii, r, g, b, a);
				this.setPixel(imageData, x+ii, y-j, r, g, b, a);

				this.setPixel(imageData, x-j, y+ii, r, g, b, a);
				this.setPixel(imageData, x-ii, y+j, r, g, b, a);

				this.setPixel(imageData, x-j, y-ii, r, g, b, a);
				this.setPixel(imageData, x-ii, y-j, r, g, b, a);
			}
		}
	}
}

PixelGraph.prototype.scalePixel = function (i, x, y, imageData) {
	var a = 250;
	if (i < 25 && i > -1) {
		this.shape(7, 6, x, y, imageData,
			this.gradient[0][0], this.gradient[1][0],this.gradient[2][0], a );
	} else if (i < 50 && i > 24) {
		this.shape(7, 5, x, y, imageData,
			this.gradient[0][1], this.gradient[1][1], this.gradient[2][1], a );
	} else if (i < 100 && i > 49) {
		this.shape(5, 4, x, y, imageData,
			this.gradient[0][2], this.gradient[1][2], this.gradient[2][2], a );
	} else if (i < 150 && i > 99) {
		this.shape(5, 3, x, y, imageData,
			this.gradient[0][3], this.gradient[1][3], this.gradient[2][3], a );
	} else if (i < 200 && i > 149) {
		this.shape(3, 3, x, y, imageData,
			this.gradient[0][4], this.gradient[1][4], this.gradient[2][4], a );
	} else if (i < 250 && i > 199) {
		this.shape(3, 1, x, y, imageData,
			this.gradient[0][5], this.gradient[1][5], this.gradient[2][5], a );
	} else if (i < 500 && i > 249) {
		this.shape(3, 1, x, y, imageData,
			this.gradient[0][6], this.gradient[1][6], this.gradient[2][6], a );
	} else if (i < 2000 && i > 499) {
		this.shape(1, 1, x, y, imageData,
			this.gradient[0][7], this.gradient[1][7], this.gradient[2][7], a );
	} else if (i < 4000 && i > 1999) {
		this.shape(1, 1, x, y, imageData,
			this.gradient[0][8], this.gradient[1][8], this.gradient[2][8], a );
	} else if (i < 6000 && i > 3999) {
		this.shape(1, 1, x, y, imageData,
			this.gradient[0][7], this.gradient[1][7], this.gradient[2][7], a );
	} else if (i < 8000 && i > 5999) {
		this.shape(3, 1, x, y, imageData,
			this.gradient[0][6], this.gradient[1][6], this.gradient[2][6], a );
	} else if (i < 10000 && i > 7999) {
		this.shape(3, 3, x, y, imageData,
			this.gradient[0][5], this.gradient[1][5], this.gradient[2][5], a );
	}
}

PixelGraph.prototype.createGradient = function(rgb,rgbd,n) {
	var rgb = parseRGB(rgb);
	var rgbd = parseRGB(rgbd);
	var rgbGradient = []
	for (var i=1; i<4; i++) {
    rgbGradient.push(singleGradient(rgb[i],rgbd[i],n));
  }
	return rgbGradient;

	function parseRGB(rgb) {
	  var rgb = rgb.match(
			/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	  return (rgb && rgb.length === 4) ? rgb : null;
	}
	function singleGradient(c,d,n) {
		c = parseInt(c);
		shift = parseInt(d) - c;
		var colors = [c];
		for (var i=1; i<n; i++) {
	    colors.push(Math.round( shift * (i/n) ) + c);
	  }
	  return colors;
	}
}
