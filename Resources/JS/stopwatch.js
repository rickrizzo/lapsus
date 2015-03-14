/* Thanks to maček from stackoverflow */

//Stopwatch Template from Stack Overflow
var Stopwatch = function(elem, options) {

  var timer       = createTimer(),
      offset,
      clock,
      interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements     
  elem.appendChild(timer);
	/*
  elem.appendChild(startButton);    
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);
	*/

  // initialize
  reset();
	
	// use onclick events for buttons instead of javascript buttons.
	document.getElementById("timerStart").onclick = start;
	document.getElementById("timerStop").onclick = stop;
	document.getElementById("timerReset").onclick = reset;
	
  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    timer.innerHTML = clock/1000; 
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }
	
	function getTime() {
		return clock;
	}

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};

var elems = document.getElementsByClassName("stopwatch");

for (var i=0, len=elems.length; i<len; i++) {
  new Stopwatch(elems[i]);
}