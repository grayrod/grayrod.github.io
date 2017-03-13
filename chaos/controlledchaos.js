var activeColor = 'grayscale';
var activeMode = 'dense'
var a = 0.808;
var b = 0.9999;
var x = 0;
var y = 7;
var n = 6000;
var s = 500;
var activeOptions = {};
function drawChart() {
  if (activeColor != 'black') {
    var dataz = separate(points);
  } else {
    var dataz = points.unshift(['x','y']);
  }
  var data = google.visualization.arrayToDataTable(dataz);
  var options = activeOptions;
  $('#results').html("<strong>a</strong> = " + a.toFixed(4) + " <strong>b</strong> = " + b.toFixed(4) + " <strong>x</strong> = " + x + " <strong>y</strong> = " + y);
  var chart = new google.visualization.ScatterChart(document.getElementById('plot'));
  google.visualization.events.addListener(chart, 'ready', chartReadyHandler);
  chart.draw(data, activeOptions);
}
function mira(a0, b0, x0, y0) {
  points = [];
  var a1 = Number(a0);
  var b1 = Number(b0);
  var x1 = Number(x0);
  var y1 = Number(y0);
  var c1 = 2 - 2*a1;
  var w1 = a1*x1 + ((c1*x1*x1)/(1 + x1*x1));
  var i = 0;
  while (i < n+1) {
    i++;
    var z1 = x1;
    var x1 = b1*y1 + w1;
    var u1 = x1*x1;
    var w1 = a1*x1 + ((c1*u1)/(1 + u1));
    var y1 = w1 - z1;
    points.push([x1,y1]);
  }
}
function separate(data) {
  var len = data.length;
  var separatedData =[['x', 'y0', 'y100', 'y200', 'y300', 'y400', 'y500', 'y600', 'y700', 'y800', 'y900', 'y1000', 'y1100']];
  for (var i = 0; i < 12; i++) {
    for (var j = i*s; j < (i+1)*s; j++) {
      var el = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
      el[0] = Number(points[j][0]);
      el[i+1] = Number(points[j][1]);
      separatedData.push(el);
    }
  }
  for (var j = 11*s; j < len; j++) {
    var el = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
    el[0] = Number(points[j][0]);
    el[12] = Number(points[j][1]);
    separatedData.push(el);
  }
  return separatedData;
}
function chartReadyHandler() {
  if (activeMode == 'dense') {
    playbackDense();
  } else if (activeMode == 'fluffy') {
    playbackFluffy();
  }
}
function playbackDense() {
    timer = setTimeout(function() {randomize(); mira(a, b, x, y, n); drawChart();}, 5000);
}
function playbackFluffy() {
    if (b < 0.999) {
      timer = setTimeout(function() {b = b + 0.001; mira(a, b, x, y, n); drawChart();}, 300);
    } else if (b < 1.0010) {
      timer = setTimeout(function() {b = b + 0.0001; mira(a, b, x, y, n); drawChart();}, 300);
    } else if (b = 1.0010) {
      timer = setTimeout(function() {randomize(); b = 0.990; mira(a, b, x, y, n); drawChart();}, 300);
    }
}
function stop() {
  clearTimeout(timer);
}
function randomize() {
  a = randoFlip(Math.random());
  b = (Math.random()+39)/40;
  x = randoInt(-10, 10);
  y = randoInt(-10, 10);
}
function randoInt(a, b) {
  var min = Math.ceil(a);
  var max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randoFlip(a) {
  let sign = randoInt(0, 1);
  if (Math.round(sign) == 0) {
    return -a;
  } else {
    return a;
  }
}
function setPlaybackStyle(value) {
  if (value == 'dense') {
    activeMode = 'dense';
    n = 6000;
    s = 500;
  } else {
    activeMode = 'fluffy';
    n = 600;
    s = 50;
  }
}
function setChartStyle(value) {
  if (value == 'grayscale') {
    activeColor = 'grayscale';
    activeOptions = {
      colors: ['#333333', '#424242', '#575757', '#666666', '#777777', '#808080', '#999999', '#aaaaaa', '#b8b8b8', '#cccccc', '#d9d9d9', '#e8e8e8'],
      series: {
              0: {pointShape: 'circle', pointSize: 1},
              1: {pointShape: 'circle', pointSize: 1},
              2: {pointShape: 'circle', pointSize: 1},
              3: {pointShape: 'circle', pointSize: 1},
              4: {pointShape: 'circle', pointSize: 2},
              5: {pointShape: 'circle', pointSize: 2},
              6: {pointShape: 'circle', pointSize: 2},
              7: {pointShape: 'circle', pointSize: 2},
              8: {pointShape: 'circle', pointSize: 3},
              9: {pointShape: 'circle', pointSize: 3},
              10: {pointShape: 'circle', pointSize: 3},
              11: {pointShape: 'circle', pointSize: 3}
      },
      hAxis: {baselineColor: 'transparent', gridLineWidth: 0, minorGridLineWidth: 0, gridlines: {color: 'transparent'}, ticks: 'none', labels: {enabled: false}, minorTickLength: 0,
      tickLength: 0},
      vAxis: {baselineColor: 'transparent', gridLineWidth: 0, minorGridLineWidth: 0, gridlines: {color: 'transparent'}, ticks: 'none', labels: {enabled: false}, minorTickLength: 0,
      tickLength: 0},
      axisTitlesPosition: 'none',
      titlePosition: 'none',
      legend: 'none',
      explorer: {actions: ['dragToZoom', 'rightClickToReset'], maxZoomIn:0.001, keepInBounds: true },
      chartArea: {top:0, left:0, height:'100%', width:'100%'}
    };
  } else if (value == 'rainbow') {
    activeColor = 'rainbow';
    activeOptions = {
      colors: ['#ff0000', '#e2571e', '#ff7f00', '#ff3300', '#ffff00', '#00ff00', '#96bf33', '#0000ff', '#4b0082', '#8b00ff', '#4b0082', '#2e0854'],
      series: {
              0: {pointShape: 'circle', pointSize: 1},
              1: {pointShape: 'circle', pointSize: 1},
              2: {pointShape: 'circle', pointSize: 1},
              3: {pointShape: 'circle', pointSize: 1},
              4: {pointShape: 'circle', pointSize: 2},
              5: {pointShape: 'circle', pointSize: 2},
              6: {pointShape: 'circle', pointSize: 2},
              7: {pointShape: 'circle', pointSize: 2},
              8: {pointShape: 'circle', pointSize: 1},
              9: {pointShape: 'circle', pointSize: 1},
              10: {pointShape: 'circle', pointSize: 1},
              11: {pointShape: 'circle', pointSize: 1}
      },
      hAxis: {baselineColor: 'transparent', gridLineWidth: 0, minorGridLineWidth: 0, gridlines: {color: 'transparent'}, ticks: 'none', labels: {enabled: false}, minorTickLength: 0,
      tickLength: 0},
      vAxis: {baselineColor: 'transparent', gridLineWidth: 0, minorGridLineWidth: 0, gridlines: {color: 'transparent'}, ticks: 'none', labels: {enabled: false}, minorTickLength: 0,
      tickLength: 0},
      axisTitlesPosition: 'none',
      titlePosition: 'none',
      legend: 'none',
      explorer: {actions: ['dragToZoom', 'rightClickToReset'], maxZoomIn:0.001, keepInBounds: true },
      chartArea: {top:0, left:0, height:'100%', width:'100%'}
    };
  } else {
    activeColor = 'black';
    activeOptions = {
      colors: ['#000000'],
      hAxis: {baselineColor: 'transparent', gridLineWidth: 0, minorGridLineWidth: 0, gridlines: {color: 'transparent'}, ticks: 'none', labels: {enabled: false}, minorTickLength: 0,
      tickLength: 0},
      vAxis: {baselineColor: 'transparent', gridLineWidth: 0, minorGridLineWidth: 0, gridlines: {color: 'transparent'}, ticks: 'none', labels: {enabled: false}, minorTickLength: 0,
      tickLength: 0},
      axisTitlesPosition: 'none',
      titlePosition: 'none',
      legend: 'none',
      explorer: {actions: ['dragToZoom', 'rightClickToReset'], maxZoomIn:0.001, keepInBounds: true },
      chartArea: {top:0, left:0, height:'100%', width:'100%'}
    };
  }
}
function kickStart(a,b,x,y) {
  setChartStyle('grayscale');
  setPlaybackStyle('dense');
  mira(a,b,x,y);
  drawChart();
}
function colorToggle() {
  stop()
  if (activeColor == 'grayscale') {
    setChartStyle('rainbow');
    mira(a,b,x,y);
    drawChart();
  } else {
    setChartStyle('grayscale');
    mira(a,b,x,y);
    drawChart();
  }
}
function modeToggle() {
  stop()
  if (activeMode == 'dense') {
    setPlaybackStyle('fluffy');
    mira(a,b,x,y);
    drawChart();
  } else {
    setPlaybackStyle('dense');
    mira(a,b,x,y);
    drawChart();
  }
}
