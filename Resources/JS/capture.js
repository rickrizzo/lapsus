//Start Presentation Capture
function startPresentation() {
  "use strict";
  recognition.start();
  startVideo();
  startCapture();
}

function stopPresentation() {
  "use strict";
  recognition.stop();
  stopCapture();
  stopVide();
}