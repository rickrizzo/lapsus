//Speech Recognition
if(!('webkitSpeechRecognition' in window)) {
	upgrade();
} else {
	//Variables
	var finalTranscript = "";
	var recognizing = false;
	var recognition = new webkitSpeechRecognition();
	var fillerCount = 0;
	var confidenceSum;
	var confidenceCount = 0;
	recognition.continuous = true;
	recognition.interimResults = true;

	//Start Recognition
	recognition.onstart = function() {
		console.log("Speak now!");
	}

	//Analyse Input
	recognition.onresult = function(e) {
		var interimTranscript = "";
		for(var i = e.resultIndex; i < event.results.length; ++i) {
			if(e.results[i].isFinal) {

				console.log(e);
				
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
		//Word Count
		console.log("Word Count: " + finalTranscript.replace(/<(?:.|\n)*?>/gm, '').split(" ").length);
		console.log(finalTranscript.replace(/<(?:.|\n)*?>/gm, '').split(" "));
	}

}

/*General Functions*/
function startRecog() {
	recognizing = true;
	recognition.start();
}

function stopRecog() {
	recognition.stop();
	//console.log("Confidence Avergage: " + confidenceSum + confidenceCount);
}

function upgrade() {
	alert("Please upgrade to a modern browser");
}