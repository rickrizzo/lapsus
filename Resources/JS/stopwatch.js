var h4 = document.getElementsByTagName('h4')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h4.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" 
      + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" 
      + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

//timer(); //Removed auto start


/* Start button */
//start.onclick = timer;
function startTimer () {
  timer();
}

/* Stop button */
//stop.onclick = function() {
function stopTimer() {
    clearTimeout(t);
}

/* Clear button */
//Not used by our application
/*clear.onclick = function() {
    h4.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}*/