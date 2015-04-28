//Check Correct Vender Prefix
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.ms.GetUserMedia;
window.requestAnimationFrame = (function () {
  "use strict";
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame
    })();


//Variables
var video;
var width;
var height;
var canvas;
var images = [];
var ctx;
var result;
var capture;
var loopnum;
var startTime;
var capturing = false;
var msgdiv;
var progress;
var startButton;
var stopButton;
var frameRate = 24;
var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};

//Initialize Variables
function init() {
	"use strict";
  video = document.getElementById('userMedia');
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  //result = document.getElementById('videoResult');
  startButton = document.getElementById("videoStartBtn");
  stopButton = document.getElementById("videoStopBtn");
}

//Initialize Canvas Size
function initSize() {
  "use strict";
  width = video.clientWidth;
  height = video.clientHeight;
  canvas.width = width;
  canvas.height = height;
}

//Error Handling
var errCallback = function (e) {
  "use strict";
	window.console.log("Error: ", e);
};

//Access Webcam
function startVideo() {
  "use strict";
  init();
	navigator.getUserMedia(hdConstraints, function (stream) {
    video.src = window.URL.createObjectURL(stream);
  }, errCallback);
}

//Stop Webcam Access
function stopVideo(e) {
  "use strict";
	video.src = '';
}

//Encode Video
function encodeVideo(capture, currentImage) {
  "use strict";
  if (currentImage < images.length) {
    ctx.putImageData(images[currentImage].datas, 0, 0);
    capture.add(ctx, images[currentImage].duration);
    delete images[currentImage];
    currentImage += 1;
    setTimeout(function () {
      encodeVideo(capture, currentImage);
    }, 5);
  } else {
    //Finished
    window.alert("Your video is finished");
    var output = capture.compile();
    video.src = window.URL.createObjectURL(output);
    console.log(video.src);
    images = [];
  }
}

//Finalize Video
function finalizeVideo() {
  "use strict";
  var capture = new Whammy.Video();
  //showProgress(false);
  encodeVideo(capture, 0);
}

//Capture Video
function nextFrame() {
	"use strict";
	if (capturing) {
		var imageData;
		ctx.drawImage(video, 0, 0, width, height);
    imageData = ctx.getImageData(0, 0, width, height);
    images.push({
      duration : new Date().getTime() - startTime,
      datas : imageData
    });
    startTime = new Date().getTime();
    window.requestAnimationFrame(nextFrame);
	} else {
    window.requestAnimationFrame(finalizeVideo);
  }
}

//Begin Video Capture
function startCapture() {
  "use strict";
  initSize();
  capturing = true;
  startTime = new Date().getTime();
  nextFrame();
}

//End Video Capture
function stopCapture() {
  "use strict";
  capturing = false;
}

//Post Video to Server
function saveVideo(videoblob){
  var data = {};
  data.video = videoblob;
  data.metadata = 'test metadata';
  data.action = "save";
}