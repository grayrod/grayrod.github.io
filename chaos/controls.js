function createGraphs() {
  graphArray = [];
  for (var i = 0; i < gl*gl; i++) {
    var color1 = gradients[colorKeys[randoInt(0,colorKeys.length-1)]];
    var color2 = gradients[color1.friends[randoInt(0,color1.friends.length-1)]];
    $('#main').append('<div class="container" style="width:'+100/gl+'%; height:'
      +100/gl+'%;"><div class="graph" id="graph'+i+'"></div></div>');
    graphArray[i] = new GraphAnimation("graph"+i, gs.mode, gs.param,
      'rgb(255,255,255)', color1.rgb, color2.rgb);
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
  pp.html('<i class="fa fa-pause fa-1x"></i>');
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
      if (focused.s.looped) {
        ll.html('<i class="fa fa-random fa-1x">');
      } else {
        ll.html('<i class="fa fa-repeat fa-1x">');
      }
      if (focused.s.paused) {
        pp.html('<i class="fa fa-play fa-1x"></i>');
      } else {
        pp.html('<i class="fa fa-pause fa-1x"></i>');
      }
      if (focused.animationMode == "warp"||focused.animationMode == "warpPath"){
        focused.n = 12500;
        focused.graph.px.time = focused.n;
        focused.graph.redrawHistory();
        // console.log("1-up N = "+focused.n);
      }
      toggleButtons();

    } else {
      if (focused.s.paused == false) {
        focused.stopAnimation();
      }
      if (focused.animationMode == "warp"||focused.animationMode == "warpPath"){
        focused.n = Math.floor(20000/(gl*gl*0.8));
        focused.graph.px.time = focused.n;
        // console.log(gl+" x "+gl+" N = "+focused.n);
      }
      $(this).css("width", ""+100/gl+"%");
      $(this).css("height", ""+100/gl+"%");
      $('div.container').each(function(){
        var index = $(this).index();
        if (index != focus) { $(this).fadeToggle(500); }
      });
      toggleButtons(resizeAll(playAllExceptPaused()));
      if (focused.animationMode !== "particle") {
        focused.graph.redrawHistory();
      }
      focus = null;
    }
    function toggleButtons() {
      $('#gridsize').toggle();
      $('#eject').fadeToggle(400);
      $('#speedup').fadeToggle(200);
      $('#slowdown').fadeToggle(200);
      $('#loop').fadeToggle(200);
      $('#zoomin').fadeToggle(200);
      $('#zoomout').fadeToggle(200);
    }
  });
}
function begin() {
  $('#graph0').click();
  $('#eject').delay(100).fadeOut().fadeIn('slow').delay(100).fadeOut().fadeIn('slow').delay(100).fadeOut().fadeIn('slow');
  $('#eject').catWiggle('start');
  $('#eject').css("box-shadow", "inset -50px -50px 10px rgba(230,0,170,.8)");
  var killWiggle = setTimeout(function(){
    $('#eject').catWiggle('stop');
    $('#eject').css("box-shadow", "inset -5px -5px 0px rgba(40,40,40,.8)");
  },4000);
}
function prepareButtons() {
  ll = $( '#loop > p' );
  pp = $( '#playpause > p' );
  pp.html('<i class="fa fa-pause fa-1x"></i>')
  $('.topbtn').click(function(){
    $(this).children("div").toggle(100);
    $(this).siblings().each( function(){$(this).children("div").hide();});
  });
  $('#eject').click(function() {
    $('div.container').get(focus).click();
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
      focused.animationMode = $(this).attr("graph-mode");
      focused.initialize();
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
      if (!focused.s.paused) {
        focused.startAnimation();
      }
    }
  });
  $('div.topbtn').mousedown(function(){
    $(this).css("box-shadow", "inset 3px 3px 0px rgba(30,30,30,0.4)");
    $(this).children('p').css("padding", "23% 23% 22% 23%");
  });
  $('div.topbtn').mouseup(function(){
    $(this).css("box-shadow", "inset -5px -5px 0px rgba(30,30,30,0.4)");
    $(this).children('p').css("padding", "20% 27% 25% 20%");
  });
  var particleExample = new GraphAnimation("particleexample", "particle",
    parameters.path.pathThing2, "rgb(255,255,255)", "rgb(0,0,0)",
    "rgb(100,100,100)");
  particleExample.s.shuffle = false;
  particleExample.n = 200;
  particleExample.timerParticlePath = 54;
  var particlePathExample = new GraphAnimation("particlepathexample", "particlePath",
    parameters.path.pathThing2, "rgb(255,255,255)", "rgb(0,0,0)",
    "rgb(100,100,100)");
  particlePathExample.s.shuffle = false;
  particlePathExample.n = 500;
  var warpPathExample = new GraphAnimation("warpexample", "warpPath",
    parameters.miraRando.random, "rgb(255,255,255)", "rgb(0,0,0)",
    "rgb(100,100,100)");
  warpPathExample.s.shuffle = false;
  warpPathExample.n = 1000;
  $('#about').click(function(){
    $('#about-modal').fadeToggle(200,particleExample.initialize(particlePathExample.initialize(warpPathExample.initialize())));
  });
  $('#close-modal-btn').click(function(){
    particleExample.stopAnimation();
    $('#about-modal').fadeToggle(200);
  });
}
var resizeTimer;
$(window).resize(function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeAll(),250);
});
 if ( window.orientation != undefined )
   window.onorientationchange = resizeAll();
function resizeAll() {
  for (var i = 0; i < graphArray.length ; i++) {
    graphArray[i].graph.create();
  }
  if (focused.animationMode == "warpPath") {
    focused.graph.redrawHistory("clear");
  }
}
function resizeMe() {
  focused.graph.create();
}

function playPause() {
  if (focus != null) {
      if (!focused.s.paused) {
        pauseMe();
      } else {
        playMe();
      }
  } else {
      if (pp.html() == '<i class="fa fa-pause fa-1x"></i>') {
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
  pp.html('<i class="fa fa-pause fa-1x"></i>');
}
function playMe() {
  focused.startAnimation();
  focused.s.paused = false;
  pp.html('<i class="fa fa-pause fa-1x"></i>');
}
function playAllExceptPaused() {
  for (var i = 0; i < graphArray.length; i++) {
    if (!graphArray[i].s.paused) {
      graphArray[i].startAnimation();
    }
  }
  pp.html('<i class="fa fa-pause fa-1x"></i>');
}
function pauseAll() {
  for (var i = 0; i < graphArray.length; i++) {
    if (!graphArray[i].s.paused) {
      graphArray[i].stopAnimation();
      graphArray[i].s.paused = true;
    }
  }
  pp.html('<i class="fa fa-play fa-1x"></i>');
}
function pauseMe() {
  focused.stopAnimation();
  focused.s.paused = true;
  pp.html('<i class="fa fa-play fa-1x"></i>');
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
  ll.html('<i class="fa fa-random fa-1x">');
  // logLoopedStates();
}
function unLoopMe() {
  focused.s.looped = false;
  ll.html('<i class="fa fa-repeat fa-1x">');
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
  if (focused.s.accelerated != true) {
    focused.s.accelerated = true;
  }
  if (focused.animationMode == "warpPath"||focused.animationMode == "warp") {
    if (focused.warpRate > 0.000001) {
      focused.warpRate = (focused.warpRate)/5;
    }
  } else {
    if (focused.timerParticlePath < 96) {
      focused.timerParticlePath = focused.timerParticlePath + 20;
      focused.stopAnimation();
      focused.startAnimation();
    }
  }
  // logAcceleratedStates();
}
function speedUp() {
  if (focused.s.accelerated != true) {
    focused.s.accelerated = true;
  }
  if (focused.animationMode == "warpPath"||focused.animationMode == "warp") {
    if (focused.warpRate < 0.1) {
      focused.warpRate = (focused.warpRate)*5;
    }
  } else {
    if (focused.timerParticlePath > 16) {
      focused.timerParticlePath = focused.timerParticlePath - 10;
      focused.stopAnimation();
      focused.startAnimation();
    }
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
