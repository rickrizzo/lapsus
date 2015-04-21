/*Start all recoding functions with a singular function call*/

//Variables
var speech;
var time;

//Start Presentation Capture
function startPresentation() {
  "use strict";
  recognition.start(); //Start speech to text
  startVideo(); //Start video stream
  startCapture(); //Sart video recording
  startTimer(); //Start Timer
}

//Stop Presentation Capture
function stopPresentation() {
  "use strict";
  recognition.stop(); //Start speech to text
  stopCapture(); //Stop video capture
  stopVideo(); //Stop video stream
  stopTimer(); //Stop Timer
  speech = document.getElementById("final_span").innerHTML;
  time = document.getElementsByTagName("h4")[0].textContent;
  WPM(speech, time);
}

/*********************************ANALYTICS***************************************/

//Calculate Words Per Minute
function WPM(speech, time) {
  var speechArr = speech.split(" ");
  var timeArr = time.split(":");
  var minutes = timeArr[1] + 
      (60 * timeArr[0]) + 
      (timeArr[2] /  60);
  //console.log(speechArr.length / minutes);
  document.getElementById("WPM").innerHTML = "Words Per Minute: " + speechArr.length / minutes;
}
