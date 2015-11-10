if(!(	'webkitSpeechRecognition' in window)) {
	upgrade();
} else {
	//Variables
	var finalTranscript = "";
	var recognizing = false;
	var recognition = new webkitSpeechRecognition();
	var fillerCount = 0;
	var timer = 0;
	var seconds = 0;
	var minutes = 0;
	var sections = 4;
	var speechlength = 600;
	var totalwords = 0;
	var wordspermin = 0;
	var clockfunc;
	var clockrunning = false;
	recognition.continuous = true;
	recognition.interimResults = true;

	/*Recognition Functions*/
	//Start Recognition
	recognition.onstart = function() {
		console.log("Speak now!");
	}

	//Analyse Input
	recognition.onresult = function(e) {
		var interimTranscript = "";
		for(var i = e.resultIndex; i < event.results.length; ++i) {
			if(e.results[i].isFinal) {
				
				//Evaluate Results
				if(event.results[i][0].confidence < 0.50) {
					finalTranscript += "<font color='red'>" + event.results[i][0].transcript + "</font>";
				} else if(event.results[i][0].confidence < 0.80) {
					finalTranscript += "<font color='yellow'>" + event.results[i][0].transcript + "</font>";
				} else {
					finalTranscript += "<font color='green'>" + event.results[i][0].transcript + "</font>";
				}

			} else {
				interimTranscript += event.results[i][0].transcript;
			}
			finalSpan.innerHTML = finalTranscript;
			interimSpan.innerHTML = interimTranscript;
		}
	}

	//Handle Errors
	recognition.onerror = function(e) {
		if(e.error == 'bad-grammar') {
			console.log("Error in grammar!");
		} else if(e.error == "no-speech") {
			console.log("Paused?");
		} else if(e.error == "audio-capture") {
			console.log("Can't hear you!");
		}
	}

	//End Recognition
	recognition.onend = function() {
		recognizing = false;
		console.log("Finished recording");
	}

}

/*General Functions*/
function startRecog() {
	recognizing = true;
	//Checks to make sure the clock isn't already running, prevents bugs with the clock ticking up more than one second at a time
	if(!clockrunning)
	{
		//Function runs increment second every 1000 milliseconds
		clockfunc = setInterval(incrementsecond, 1000);
		//Mark the clock is running
		clockrunning = true;
	}
	recognition.start();
}

function stopRecog() {
	//Turn off the cycling function
	window.clearInterval(clockfunc);
	//Mark the clock is no longer running
	clockrunning = false;
	recognition.stop();
}

//Upon hitting the reset button, resets the timer
function resetTimer()
{
	//Reset seconds and minutes count
	seconds = 0;
	minutes = 0;
	//Modify the clock back to 00:00
	document.getElementById('clock').innerHTML = "00:00";
}

function upgrade() {
	alert("Please upgrade to a modern browser");
}

//Function for doing all of the functions needed every second while the program is running - currently calculating words per min and clock
function incrementsecond(){
	//Increment the seconds counter
	seconds++;
	//Check if seconds > 60, if so add a minute
	if(seconds >= 60)
	{
		seconds = 0;
		minutes++;
	}
	//if minutes or seconds is under 10 (aka 1 digit vs 2) we add a 0 on the front to keep the formatting looking right
	if(seconds < 10)
	{
		if (minutes < 10)
		{
			document.getElementById('clock').innerHTML = "0" + minutes + ":" + "0" + seconds;
		}
		else
		{
			document.getElementById('clock').innerHTML = minutes + ":" + "0" + seconds;
		}
	}
	else
	{
		if(minutes < 10)
		{
			document.getElementById('clock').innerHTML = "0" + minutes + ":" + seconds;
		}
		else
		{
			document.getElementById('clock').innerHTML = minutes + ":" + seconds;
		}
	}
	//Trying to extract the total words statistic, currently not functioning
	totalwords = recognition.SpeechRecognitionResultList.length;
	//Calculate words per minute
	wordspermin = totalwords/(minutes+(seconds/60));
	//Set word/min document to words per mind
	//document.getElementById('wordcount').innerHTML = "Words per minute: " + totalwords;
	//console.log(wordspermin);
}

/*function sectioncalc()
{
	var sectionleft;
	timeleft = speechlength%sections;
	if(timeleft > speechleft)
}*/