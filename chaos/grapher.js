var chartMap = {};
var lastChart;
function PixelGraph(targetDivId, dataProvider, pixelRenderFunction, minX, maxX, minY, maxY, canvasColor, pixelColorR, pixelColorG, pixelColorB) {

	chartMap[ targetDivId ] = this;

	this.targetDivId = targetDivId;
	this.targetDiv = $( "#"+this.targetDivId );
	this.dataProvider = dataProvider;
	this.minX = minX;
	this.maxX = maxX;
	this.minY = minY;
	this.maxY = maxY;
	this.canvasColor = canvasColor;
	this.pixelColorR = pixelColorR;
	this.pixelColorG = pixelColorG;
	this.pixelColorB = pixelColorB;

	if (pixelRenderFunction != undefined && pixelRenderFunction != null)
		this.pixelRenderFunction = pixelRenderFunction;
	else
		this.pixelRenderFunction = drawSinglePixel;

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
		{
			this.pixelRenderFunction( _x, _y, o, imageData );
		}
	}

	ctx.putImageData(imageData, 0, 0);

}

PixelGraph.prototype.setPixel = function(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function drawSinglePixel( x, y, data, imageData ) {
	PixelGraph.prototype.setPixel(imageData, x, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF)
}

function drawCross( x, y, data, imageData ) {
	PixelGraph.prototype.setPixel(imageData, x, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
}

function draw3x3( x, y, data, imageData ) {
	PixelGraph.prototype.setPixel(imageData, x, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
}

function draw3x5( x, y, data, imageData ) {
	PixelGraph.prototype.setPixel(imageData, x, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-2, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

}

function draw5x5( x, y, data, imageData ) {
	PixelGraph.prototype.setPixel(imageData, x, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y-2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x, y+2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-2, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-2, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-2, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y-1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+2, y+1, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);

	PixelGraph.prototype.setPixel(imageData, x-1, y-2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x-1, y+2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y-2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
	PixelGraph.prototype.setPixel(imageData, x+1, y+2, this.pixelColorR, this.pixelColorG, this.pixelColorB, 0xFF);
}
