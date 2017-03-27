var chartMap = {};
var lastChart;
function PixelGraph(targetDivId, dataProvider, pixelRenderFunction, minX, maxX, minY, maxY, canvasColor, pixelColor) {

	chartMap[ targetDivId ] = this;

	this.targetDivId = targetDivId;
	this.targetDiv = $( "#"+this.targetDivId );
	this.dataProvider = dataProvider;
	this.minX = minX;
	this.maxX = maxX;
	this.minY = minY;
	this.maxY = maxY;
	this.canvasColor = canvasColor;
	this.pixelColor = pixelColor;

	if (pixelRenderFunction != undefined && pixelRenderFunction != null)
		this.pixelRenderFunction = pixelRenderFunction;
	else
		this.pixelRenderFunction = draw1x1;

	this.draw5x4 = draw5x4;
	this.draw5x3 = draw5x3;
	this.draw3x3 = draw3x3;
	this.draw3x1 = draw3x1;
	this.draw2x2 = draw2x2;
	this.draw1x1 = draw1x1;

	this.horizontalAttribute = "x";
	this.horizontalMin = this.minX;
	this.horizontalMax = this.maxX;
	this._horizontalMin = undefined;
	this._horizontalMax = undefined;

	this.verticalAttribute = "y";
	this.verticalMin = this.minY;
	this.verticalMax = this.maxY;
	this._verticalMin = undefined;
	this._verticalMax = undefined;
	this.borderSize = 0;

	this.rgbg = [];
	this.gradient(this.pixelColor, 255, 12);

	lastChart = this;
	this.validateLayout();
}


PixelGraph.prototype.validateLayout = function( event ) {
	var chart = lastChart;
	if (chart.canvas)
		chart.canvas.remove();
	chart.canvas = $( "<canvas width='" + chart.targetDiv.width() + "' height='" + chart.targetDiv.height() + "' />" );
	chart.targetDiv.html( chart.canvas );
	chart.render();
}

PixelGraph.prototype.width = function() {
	return this.targetDiv.width();
}

PixelGraph.prototype.height = function() {
	return this.targetDiv.height();
}

PixelGraph.prototype.render = function() {
	var i = 0;
	var w = this.targetDiv.width();
	var h = this.targetDiv.height();
	var chartW = w - 2*this.borderSize;
	var chartH = h - 2*this.borderSize;

	var ctx = this.canvas[0].getContext("2d");
	ctx.fillStyle = this.canvasColor;
	ctx.fillRect (0, 0, w, h);

 	var imageData = ctx.getImageData(0, 0, w, h);

	if (isNaN( this._horizontalMax)) {
		this._horizontalMin = this.horizontalMin;
		this._horizontalMax = this.horizontalMax;
		this._verticalMin = this.verticalMin;
		this._verticalMax = this.verticalMax;
	}

	var horizontalDiff = this._horizontalMax - this._horizontalMin;
	var verticalDiff = this._verticalMax - this._verticalMin;

	var _x;
	var _y;
	var o;

	for (var i=0; i < this.dataProvider.length; i++) {
		o = this.dataProvider[i];
		_x = (o[this.horizontalAttribute] - this._horizontalMin) / horizontalDiff;
		_y = (o[this.verticalAttribute] - this._verticalMin) / verticalDiff;

		_x = parseInt( this.borderSize+(_x * chartW) );
		_y = parseInt( this.borderSize+(chartH-(_y * chartH)) );

		if ( _x > this.borderSize && _x < w - this.borderSize &&
			_y > this.borderSize && _y < h - this.borderSize)
		// {
		// 	this.pixelRenderFunction( _x, _y, o, imageData );
		// }

		{
			if (i < 25 && i > -1) {
				this.draw5x4( _x, _y, o, imageData, this.rgbg[0][0], this.rgbg[1][0], this.rgbg[2][0] );
			} else if  (i < 50 && i > 24) {
				this.draw5x4( _x, _y, o, imageData, this.rgbg[0][1], this.rgbg[1][1], this.rgbg[2][1] );
			} else if  (i < 100 && i > 49) {
				this.draw5x3( _x, _y, o, imageData, this.rgbg[0][2], this.rgbg[1][2], this.rgbg[2][2] );
			} else if (i < 150 && i > 99) {
				this.draw3x3( _x, _y, o, imageData, this.rgbg[0][3], this.rgbg[1][3], this.rgbg[2][3] );
			} else if (i < 200 && i > 149) {
				this.draw3x1( _x, _y, o, imageData, this.rgbg[0][4], this.rgbg[1][4], this.rgbg[2][4] );
			} else if (i < 250 && i > 199) {
				this.draw3x1( _x, _y, o, imageData, this.rgbg[0][5], this.rgbg[1][5], this.rgbg[2][5] );
			} else if (i < 500 && i > 249) {
				this.draw2x2( _x, _y, o, imageData, this.rgbg[0][4], this.rgbg[1][6], this.rgbg[2][6] );
			} else if (i < 2000 && i > 499) {
				this.draw1x1( _x, _y, o, imageData, this.rgbg[0][3], this.rgbg[1][7], this.rgbg[2][7] );
			} else if (i < 4000 && i > 1999) {
				this.draw1x1( _x, _y, o, imageData, this.rgbg[0][2], this.rgbg[1][8], this.rgbg[2][8] );
			} else if (i < 6000 && i > 3999) {
				this.draw1x1( _x, _y, o, imageData, this.rgbg[0][1], this.rgbg[1][9], this.rgbg[2][9] );
			} else if (i < 8000 && i > 5999) {
				this.draw2x2( _x, _y, o, imageData, this.rgbg[0][0], this.rgbg[1][10], this.rgbg[2][10] );
			} else if (i < 10000 && i > 7999) {
				this.draw3x3( _x, _y, o, imageData, this.rgbg[0][0], this.rgbg[1][11], this.rgbg[2][11] );
			}
		}


	}

	ctx.putImageData(imageData, 0, 0);

}


PixelGraph.prototype.gradient = function(rgb,d,n) {
	  var rgb = parseRGB(rgb);
	  for (var i=1; i<4; i++) {
	    this.rgbg.push(singleGradient(rgb[i],d,n));
	  }

		function parseRGB(rgb) {
		  var rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
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

PixelGraph.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function draw1x1( x, y, data, imageData, r, g, b ) {
	PixelGraph.prototype.setPixel(imageData, x, y, r, g, b, 0xFF)
}

function draw2x2( x, y, data, imageData, r, g, b ) {
	PixelGraph.prototype.setPixel(imageData, x, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y-1, r, g, b, 0xFF);
}


function draw3x1( x, y, data, imageData, r, g, b ) {
	PixelGraph.prototype.setPixel(imageData, x, y, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, r, g, b, 0xFF);
}


function draw3x3( x, y, data, imageData, r, g, b ) {
	PixelGraph.prototype.setPixel(imageData, x, y, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+1, r, g, b, 0xFF);
}

function draw5x3( x, y, data, imageData, r, g, b ) {
	PixelGraph.prototype.setPixel(imageData, x, y, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-2, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+2, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-2, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+1, r, g, b, 0xFF);

}

function draw5x4( x, y, data, imageData, r, g, b ) {
	PixelGraph.prototype.setPixel(imageData, x, y, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-2, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+2, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-2, y, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+1, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-2, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-2, y+1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y-1, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y+1, r, g, b, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-2, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+2, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-2, r, g, b, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+2, r, g, b, 0xFF);
}
