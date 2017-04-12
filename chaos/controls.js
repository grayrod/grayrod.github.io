function createGraphs() {
  graphArray = [];
  for (var i = 0; i < gl*gl; i++) {
    // var color0 = gradients[colorKeys[randoInt(0,colorKeys.length-1)]];
    var color1 = gradients[colorKeys[randoInt(0,colorKeys.length-1)]];
    var color2 = gradients[color1.friends[randoInt(0,color1.friends.length-1)]];
    $('#main').append('<div class="container" style="width:'+100/gl+'%; height:'
      +100/gl+'%;"><div class="graph" id="graph'+i+'"></div></div>');
    graphArray[i] = new GraphAnimation("graph"+i, gs.map, gs.mode, gs.param,
      grays.darkdarkgray, color1.rgb, color2.rgb);
    graphArray[i].initialize();
  }
  prepareContainers();
}
function destroyGraphs(callback) {
  $('div#main').empty();
  for (var i = 0; i < graphArray.length; i++) {
    if (graphArray[i].s.paused == false) {
      graphArray[i].stopAnimation();
    }
  }
  pp.html('||');
  callback();
}
function prepareContainers() {
  $('div.container').click(function(){
    if (focus == null) {
      focus = $(this).index();
      focused = graphArray[focus];
      pauseAllExceptMe();
      $('div.container').each(function(){
        if ($(this).index() != focus) {
          $(this).hide();
        }
      });
      $(this).css("width", "100%");
      $(this).css("height", "100%");
      resizeMe();
      $('#zoomout').show();
      $('#zoomin').show();
      $('#speedup').show();
      $('#slowdown').show();
//       $('#loop').show();
      $('#gridsize').hide();
      $('#instructions').hide();
      if (focused.s.looped == true) {
        ll.html('&#216;');
      } else {
        ll.html('o');
      }
      if (focused.s.paused == true) {
        pp.html('>');
      } else {
        pp.html('||');
      }
      if (focused.animationMode == "warp"||focused.animationMode == "warpPath"){
        focused.n = 20000;
        focused.graph.px.time = focused.n;
        console.log("1-up N = "+focused.n);
      }

    } else {
      if (focused.s.paused == false) {
        focused.stopAnimation();
      }
      if (focused.animationMode == "warp"||focused.animationMode == "warpPath"){
        focused.n = Math.floor(20000/(gl*gl*0.8));
        focused.graph.px.time = focused.n;
        console.log(gl+" x "+gl+" N = "+focused.n);
      }
      $(this).css("width", ""+100/gl+"%");
      $(this).css("height", ""+100/gl+"%");
      $('div.container').each(function(){
        var index = $(this).index();
        if (index != focus) { $(this).show(); }
      });
      resizeAll();
      $('#zoomout').hide();
      $('#zoomin').hide();
      $('#speedup').hide();
      $('#slowdown').hide();
      $('#loop').hide();
      $('#gridsize').show();
      pp.html('||');
      playAllExceptPaused();
      focus = null;
    }
  });
}

function prepareButtons() {
  ll = $( '#loop > p' );
  pp = $( '#playpause > p' );
  $('.dropdown').click(function(){
    $(this).children("div").toggle(100);
    $(this).siblings().each( function(){$(this).children("div").hide();});
  });
  $('a.gl').click(function() {
    gl = parseInt($(this).attr("graph-length"));
    destroyGraphs(createGraphs);
  });
  $('a.gm').click(function(){
    if (focus == null) {
      gs.mode = $(this).attr("graph-mode");
      destroyGraphs(createGraphs);
    } else {
      focused.stopAnimation();
      $('#'+focused.divID+' > canvas').remove();
      focused.animationMode = $(this).attr("graph-mode");
      focused.draw();
      if (focused.s.paused == false) {
        focused.startAnimation();
      }
    }
  });
  $('a.gs').click(function(){
    if (focus == null) {
      gs = gsets[$(this).attr("graph-set")];
      destroyGraphs(createGraphs);
    } else {
      focused.stopAnimation();
      $('#'+focused.divID+' > canvas').remove();
      focused.mappingFunc = gsets[$(this).attr("graph-set")].map;
      focused.o = gsets[$(this).attr("graph-set")].param;
      focused.setParams();
      focused.iterate();
      focused.draw();
      if (focused.s.paused == false) {
        focused.startAnimation();
      }
    }
  });
}

$(window).resize(resizeAll);
 if ( window.orientation != undefined )
   window.onorientationchange = resizeAll();
function resizeAll() {
  for (var i = 0; i < graphArray.length ; i++) {
    graphArray[i].graph.create();
  }
}
function resizeMe() {
  focused.graph.create();
}

function playPause() {
  if (focus != null) {
      if (focused.s.paused == false) {
        pauseMe();
      } else {
        playMe();
      }
  } else {
      if (pp.html() == "||") {
        pauseAll();
      } else {
        playAll();
      }
  }
  // logPausedStates();
}
function playAll() {
  for (var i = 0; i < graphArray.length; i++) {
    graphArray[i].startAnimation();
    graphArray[i].s.paused = false;
  }
  pp.html('||');
}
function playMe() {
  focused.startAnimation();
  focused.s.paused = false;
  pp.html('||');
}
function playAllExceptPaused() {
  for (var i = 0; i < graphArray.length; i++) {
    if (graphArray[i].s.paused == false) {
      graphArray[i].startAnimation();
    }
  }
  pp.html('||');
}
function pauseAll() {
  for (var i = 0; i < graphArray.length; i++) {
    if (graphArray[i].s.paused == false) {
      graphArray[i].stopAnimation();
      graphArray[i].s.paused = true;
    }
  }
  pp.html('>');
}
function pauseMe() {
  focused.stopAnimation();
  focused.s.paused = true;
  pp.html('>');
}
function pauseAllExceptMe() {
  var len = $('div.container').length;
  for (var i=0; i<len; i++) {
    if (i != focus) {
      graphArray[i].stopAnimation();
    }
  }
}
function pauseAllExceptPaused() {
  for (var i = 0; i < graphArray.length; i++) {
    if (graphArray[i].s.paused == false) {
      graphArray[i].stopAnimation();
    }
  }
}

function loopUnloop() {
  if (focused.s.looped == false) {
    loopMe();
  } else {
    unLoopMe();
  }
}
function loopMe() {
  focused.s.looped = true;
  ll.html('&#216;');
  // logLoopedStates();
}
function unLoopMe() {
  focused.s.looped = false;
  ll.html('o');
  // logLoopedStates();
}

function zoomOut() {
  if (focused.zi > 0) {
    focused.zi = focused.zi - 1;
    zoomRefresh();
  }
}
function zoomIn() {
  if (focused.zi < 23) {
    focused.zi = focused.zi + 1;
    zoomRefresh();
  }
  // console.log(focused.zi);
}
function zoomRefresh() {
  focused.scale = focused.zf[focused.zi];
  focused.graph.scale = focused.scale;
  focused.refresh();
}

function slowDown() {
  if (focused.warpRate > 0.000001) {
    focused.warpRate = (focused.warpRate)/10;
  }
  if (focused.s.accelerated != true) {
    focused.s.accelerated = true;
  }
  // logAcceleratedStates();
}
function speedUp() {
  if (focused.warpRate < 0.1) {
    focused.warpRate = (focused.warpRate)*10;
  }
  if (focused.s.accelerated != true) {
    focused.s.accelerated = true;
  }
  // logAcceleratedStates();
}

// function logPausedStates() {
//   console.log("paused state");
//   for (var i = 0; i < graphArray.length; i++) {
//     console.log(i + ": " + graphArray[i].s.paused);
//   }
// }
// function logLoopedStates() {
//   console.log("looped state");
//   for (var i = 0; i < graphArray.length; i++) {
//     console.log(i + ": " + graphArray[i].s.looped);
//   }
// }
// function logAcceleratedStates() {
//   console.log("accelerated state");
//   for (var i = 0; i < graphArray.length; i++) {
//     console.log(i + ": " + graphArray[i].s.accelerated);
//   }
// }
