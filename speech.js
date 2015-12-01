if(!(	'webkitSpeechRecognition' in window)) {
	upgrade();
} else {
	//Variables
	var finalTranscript = "";
	var recognizing = false;
	var recognition = new webkitSpeechRecognition();
	var fillerCount = 0;
	//Keeps track of the current time
	var timer = 0;
	//Variable for number of sections
	var sections = 6;
	//Stores which section we are currently on
	var currsection = 0;
	//Stores length of each section
	var sectionlength;
	//Variable for length of the speech
	var speechlength = 120;
	var totalwords = 0;
	var wordspermin = 0;
	//Stores the instance of the clock function when it is running
	var clockfunc;
	//Marks wether clockfunc is running or not, primarily for preventing multiple instances
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
		sectionlength = speechlength/sections;
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
	timer = 0;
	//Modify the clock back to 00:00
	document.getElementById('clock').innerHTML = "00:00";
}

function settingsWindow()
{
	speechlength = parseInt(window.prompt("Total length of speech (In seconds)","360"));
	if(speechlength == Null)
	{
		speechlength = 360;
	}
	else
	{
		sections = parseInt(window.prompt("Number of sections","60"));
	}
	if(sections == Null)
	{
		sections = 6;
	}
	
}

function upgrade() {
	alert("Please upgrade to a modern browser");
}

//Function doing the work for the sections portion of the timing - currently calculates the current section and gives feedback on timing for the current section (like saying how much time is left)
//In this section). Currently the section values are hard coded.
function sectioncalc() {
	//Calculate the current section based on their lengths and the current time. We add one to not start at 0 seconds
	currsection = Math.floor(timer/sectionlength) + 1;
	//Calculate the time left till the end of the current section
	var timeleft = (currsection*sectionlength) - timer;
	//If less than 5 seconds left, let the user know to start moving on to the next section
	if(timeleft <= 5)
	{
		document.getElementById('section').innerHTML = "Section " + currsection + " ending in " + timeleft + " seconds, move on to Section " + (currsection+1) + "!"; 
	}
	//If the new section has just started, display a "starting section X" message for two seconds
	else if(timeleft >= (sectionlength - 1))
	{
		document.getElementById('section').innerHTML = "Start section " + currsection +"!";
	}
	//Otherwise, just show the seconds till next section
	else
	{
		document.getElementById('section').innerHTML = "Section: " + currsection + " --- " + timeleft + " seconds left";
	}
}

//Function for doing all of the functions needed every second while the program is running - currently calculating words per min and clock
function incrementsecond(){
	//Increment the timer counter
	timer++;
	//Do some math to work out the minutes and seconds
	var seconds = timer%60;
	//Need to floor it so the minutes doesn't appear as a giant decimal
	var minutes = Math.floor(timer/60);
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
	sectioncalc();
}
