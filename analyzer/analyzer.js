google.charts.load('current', {'packages':['corechart']});
var f;
var fd;
var fda;

function analyzeMyFunction(interval, tolerance, functionOfX) {
  if (functionOfX.match(/^[0-9/.]*$/)) {
      clearData();
      fd.area = Math.abs(Number(interval[1])-Number(interval[0])) * Number(functionOfX);
      displayResults();
      drawChart([ ['x','Constant'], [Number(interval[0]),Number(functionOfX)], [Number(interval[1]),Number(functionOfX)] ]);
  } else {
      var tol = Math.abs(tolerance);
      f = function f(x) {return eval(functionOfX);}
      clearData();             // --> fd
      scout(interval, tol);    // --> fd.p & fd.area
      forage(fd.p);            // --> fd.fp
      capture(fd.fp, tol);     // --> fd.ci
      averages(fd.ci);         // --> fd.cp
      sortMergeData();         // --> fda
      getMinMax();             // --> fd.min & fd.max
      displayResults();
      plotPoints();
  }
}

// All the rest ...

function clearData() {
  fd = {p:[], dp:[], fp:[], ci:[], cp:[], min:{}, max:{}, area:NaN};
  fda = [];
  $('#alerts').empty();
  $('#plot').html("<br /><h3>&nbsp;&nbsp;&nbsp;You dun goofed this time brah.</h3>");
}

// Runs adaptiveQuadrature and cleans up its data
function scout(interval, tolerance) {
  fd.area = adaptiveQuadrature(interval, tolerance, simpsonsRule(interval), 10);
  fd.p = deDupeX(fd.p);
  fd.p = fd.p.sort(function(m, n){return m.x - n.x});
}

// Calculates area recursively until the diff of the next area and previous area is less than 15x the tolerance
function adaptiveQuadrature(interval, tol0, area0, maxRecurDepth) {
  var a = Number(interval[0]);
  var b = Number(interval[1]);
  var m = Number((a + b) / 2);
  var areaL = simpsonsRule([a, m]);
  var areaR = simpsonsRule([m, b]);
  var area1 = areaL + areaR;
  var diff = Math.abs(area1 - area0);
  if (diff <= 15*tol0 || maxRecurDepth <= 0 || area0 == Infinity || area1 == Infinity || isNaN(area0) == true || isNaN(area1) == true) {
      return (16*area1 - area0) / 15;
  } else {
      var tol1 = tol0 / 2;
      return adaptiveQuadrature([a, m], tol1, areaL, maxRecurDepth-1) + adaptiveQuadrature([m, b], tol1, areaR, maxRecurDepth-1);
  }
}

// Returns the area of the function on the interval (a,b) using the Simpson's rule method of numerical integration.
function simpsonsRule(interval) {
  var xa = Number(interval[0]);
  var xb = Number(interval[1]);
  var xm = Number((xa + xb) / 2);
  var fxa = f(xa);
  var fxb = f(xb);
  var fxm = f(xm);
  var alert = "<p><b>Aborted. Vertical asymptote.</b></p>"
  if (fxa !== Infinity && fxa !== NaN) {
    fd.p.push({x:xa, fx:fxa});
  } else {$('#alerts').html(alert)}
  if (fxm !== Infinity && fxm !== NaN) {
    fd.p.push({x:xm, fx:fxm});
  } else {$('#alerts').html(alert)}
  if (fxb !== Infinity && fxb !== NaN) {
    fd.p.push({x:xb, fx:fxb});
  } else {$('#alerts').html(alert)}
  return ((xb - xa) / 6) * (fxa + 4*fxm + fxb);
}

// Calculates numerical derivatives of sequential pairs of intervals (3 data points at a time) and multiplies them together to indentify inflection points.
function forage(points) {
  for (var i = 0; i < points.length - 2; i++) {
    var p0 = points[i];
    var p1 = points[i+1];
    var p2 = points[i+2];
    var m = (p1.fx * (p0.fx - p1.fx + p2.fx) - p0.fx * p2.fx) / (p1.x * (p0.x - p1.x + p2.x) - p0.x * p2.x)
    if (m <= 0) {
      fd.fp.push(p0);
      fd.fp.push(p1);
      fd.fp.push(p2);
    }
  }
}

// Runs zoom over sequential pairs of points
function capture(points, coverSize) {
  for (var i = 0; i < points.length - 1; i++) {
    zoom([points[i].x, points[i+1].x], coverSize, 10);
  }
}

// Chops an interval into smaller and smaller parts recursively looking for inflection points within the width of cover size.
function zoom(interval, coverSize, maxRecurDepth) {
  var newPoints = fivePointDifferences(interval);  // array with length 6
  var captured = [];  // pairs of points
  for (var i = 0; i < 5; i++) {
    let adjacentProduct = newPoints[i].dfx * newPoints[i+1].dfx;
    if (adjacentProduct <= 0) {
      captured.push([newPoints[i], newPoints[i+1]]);
    }
  }
  if (captured.length == 0) {
    let nextWidth = 0;
  } else {
    for (var j = 0; j < captured.length; j++) {
      let nextWidth = Math.abs(captured[j][1].x - captured[j][0].x);
      if (nextWidth < coverSize || maxRecurDepth <= 0) {
        fd.ci.push(captured[j]);
      } else {
        zoom([captured[j][0].x, captured[j][1].x], coverSize, maxRecurDepth-1);
      }
    }
  }
}

// Calculates numerical derivatives using five point difference methods (forwards, middle, backwards).
function fivePointDifferences(interval) {
  var x0 = Number(interval[0]);
  var x1 = Number(interval[1]);
  var d =  Number((x1 - x0) / 5);
  var pt = [];
  for (var i = 0; i < 6; i++) {
    let xi = x0 + (i * d);
    let fxi = f(xi);
    pt.push({x:xi, fx:fxi, dfx:NaN});
  }
  var h = Math.abs(pt[1].x - pt[0].x);
  var len = pt.length
  // forwards
  for (var i = 0; i < 2; i++) {
    let derivative = (1/(12*h)) * (-25*pt[i].fx + 48*pt[i+1].fx - 36*pt[i+2].fx + 16*pt[i+3].fx - 3*pt[i+4].fx);
    pt[i].dfx = derivative;
    fd.dp.push(pt[i]);
  }
  // middle
  for (var j = 2; j < 4; j++) {
    let derivative = (1/(12*h)) * (pt[j-2].fx - 8*pt[j-1].fx + 8*pt[j+1].fx - pt[j+2].fx);
    pt[j].dfx = derivative;
    fd.dp.push(pt[j]);
  }
  // backwards
  for (var k = len - 2; k < len; k++) {
    let derivative = (1/(12*h)) * (3*pt[k-4].fx - 16*pt[k-3].fx + 36*pt[k-2].fx - 48*pt[k-1].fx + 25*pt[k].fx);
    pt[k].dfx = derivative;
    fd.dp.push(pt[k]);
  }
  return pt
}

// Takes the average point within each interval
function averages(intervals) {
  for (var i = 0; i < intervals.length; i++) {
    let xMean = (intervals[i][1].x + intervals[i][0].x) / 2;
    let fMean = f(xMean);
    fd.cp.push({x:xMean, fx:fMean});
  }
  fd.cp = deDupeX(fd.cp);
}

function deDupeX(pointsArray) {
  var seen = {};
  var uniqueArray = [];
  var len = pointsArray.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    let point = pointsArray[i];
    let pointxValue = pointsArray[i].x;
    if (seen[pointxValue] !== 1) {
      seen[pointxValue] = 1;
      uniqueArray[j++] = point;
    }
  }
  return uniqueArray;
}

// Combine data and sort it
function sortMergeData() {
    fd.dp = deDupeX(fd.dp);
    var temp = fd.cp.concat(fd.p);
    fda = temp.concat(fd.dp);
    fda = deDupeX(fda);
    fda = fda.sort(function(m, n){return m.fx - n.fx});
    console.log('Extremum: '+JSON.stringify(fd.cp));
}

function getMinMax() {
    let last = fda.length - 1;
    fd.min.x = fda[0].x;
    fd.min.fx = fda[0].fx;
    fd.max.x = fda[last].x;
    fd.max.fx = fda[last].fx;
}

function displayResults() {
  var resultsHTML = "<p><span>Calculated</span> " + fda.length + " unique points&nbsp;&nbsp;";
  resultsHTML+="<span> Min:</span> (" + fd.min.x.toFixed(8) + ", " + fd.min.fx.toFixed(8) + ")&nbsp;&nbsp;";
  resultsHTML+="<span> Max:</span> (" + fd.max.x.toFixed(8) + ", " + fd.max.fx.toFixed(8) + ")&nbsp;&nbsp;";
  resultsHTML+="<span> Area:</span> " + fd.area.toFixed(8) + "</p>";
  $('#results').html(resultsHTML);
}

function plotPoints() {
  var pointsToPlot = [['x', 'All', 'Quadrature', 'Local Extremum', 'Global Extrema']];
  for (var i = 0; i < fda.length; i++) {
    pointsToPlot.push([fda[i].x, fda[i].fx, NaN, NaN, NaN])
  }
  for (var i = 0; i < fd.p.length; i++) {
    pointsToPlot.push([fd.p[i].x, NaN, fd.p[i].fx, NaN, NaN])
  }
  for (var i = 0; i < fd.cp.length; i++) {
    pointsToPlot.push([fd.cp[i].x, NaN, NaN, fd.cp[i].fx, NaN])
  }
  pointsToPlot.push([fd.min.x, NaN, NaN, NaN, fd.min.fx]);
  pointsToPlot.push([fd.max.x, NaN, NaN, NaN, fd.max.fx]);
  google.charts.setOnLoadCallback(drawChart(pointsToPlot));
}

function drawChart(points) {
  var data = google.visualization.arrayToDataTable(points);
  var options = {
    fontName: '"Comic Sans MS", "Helvetica", sans-serif',
    colors: [ '#32cd32', '#328ccd', '#ffa500', '#e94d20'],
    series: {
            0: { pointShape: 'circle', pointSize: 3},
            1: { pointShape: 'circle', pointSize: 3},
            2: { pointShape: 'diamond', pointSize: 8},
            3: { pointShape: 'diamond', pointSize: 10},
            visibleInLegend: true
        },
    hAxis: {title: 'x'},
    vAxis: {title: 'f(x)'},
    legend: {position: 'top', textStyle: {color: '#444', fontSize: 16}},
    chartArea: {height:'75%', width:'75%'},
    explorer: {zoomDelta:1.05, maxZoomIn:0.001}
  };
  var chart = new google.visualization.ScatterChart(document.getElementById('plot'));
  google.visualization.events.addListener(chart, 'ready', myReadyHandler);
  chart.draw(data, options);
}

function myReadyHandler() {
  $('#loading').hide();
  $('#ready').show();
  if ($(window).width() < 800) {
    $(document).scrollTop( $('#plot').offset().top );
  }
}
