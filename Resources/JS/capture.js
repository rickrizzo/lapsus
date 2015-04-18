/*Start all recoding functions with a singular function call*/

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
}