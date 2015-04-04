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

//Initialize Variables
function init() {
	"use strict";
  video = document.getElementById('userMedia');
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  result = document.getElementById('videoResult');
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
	navigator.getUserMedia({
    video: true,
    audio: false
  }, function (stream) {
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
    result.src = window.URL.createObjectURL(output);
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

function startCapture() {
  "use strict";
  window.alert("Your video is recording. Please be patient");
  initSize();
  capturing = true;
  startTime = new Date().getTime();
  nextFrame();
}

function stopCapture() {
  "use strict";
  capturing = false;
}