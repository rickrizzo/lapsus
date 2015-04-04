//Variables
var two_line = /\n\n/g;
var one_line = /\n/g;
var first_char = /\S/;
var words = ["um", "uh", "like"];

//Upgrade Broswer
function upgrade() {
    "use strict";
	window.alert("Please upgrade your browser! (Try Switching to Chrome)");
}

//Linebreak
function linebreak(s) {
    "use strict";
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

//Detect Filler Words
function filler(s) {
    "use strict";
	
	//var tempSpeech = speech.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

	//Make Array
	var i, j;
    s = s.split(" ");
	
	
	//Find Words
	for (i = 0; i < s.length; i += 1) {
		for (j = 0; j < words.length; j += 1) {
            //Check for Filler Words
            if (s[i].toUpperCase() === words[j].toUpperCase()) {
                s[i] = "<i>" + s[i] + "</i>";
            }
        }
	}
	s = s.join(" ");
	return s;
}

//Browser Check
if (!('webkitSpeechRecognition' in window)) {
	upgrade();
} else {
	
	//Variables
	var final_transcript = "";
    
	/*var speech; 
	var SpeechMap = mapSpeech(speech);
	var speechIndex = 0;*/
	

    //Recognition Variable
    var recognizing = false;
    var recognition = new webkitSpeechRecognition();
	var ignore_onend;
	
	//API Options
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en-US";
	
	//On Start
	recognition.onstart = function () {
        "use strict";
		recognizing = true;
		/*speech = document.getElementById("textarea").value;*/
	};
	
	//On Result
	recognition.onresult = function (event) {
        "use strict";
        var i, transcript, interim_transcript = "";
	    for (i = event.resultIndex; i < event.results.length; i += 1) {
	        if (event.results[i].isFinal) {
	            transcript = event.results[i][0].transcript;
	            transcript = filler(transcript);
	            final_transcript += transcript;
	        } else {
	            interim_transcript += event.results[i][0].transcript;
	        }
	    }

        //Display Text
		document.getElementById("final_span").innerHTML = linebreak(final_transcript);
	    document.getElementById("interim_span").innerHTML = linebreak(interim_transcript);
	};
	
	//On Error
	recognition.onerror = function (event) {
        "use strict";
		//Silence
		if (event.error === 'no-speech') {
			window.alert("Speak up!");
			ignore_onend = true;
		}
		//No Microphone
		if (event.error === 'audio-capture') {
			window.alert("Make sure you have a microphone conencted!");
			ignore_onend = true;
		}
		//No Allowed
		if (event.error === 'not-allowed') {
			window.alert("You can't do that");
			ignore_onend = true;
        }
	};
	
	//On End
	recognition.onend = function () {
        "use strict";
		recognizing = false;
        
        //Ignore End
		if (ignore_onend) {
			return;
		}
		//If no final transcript
		if (!final_transcript) {
			return;
		}
		if (window.getSelection) {
            window.alert("NOT READY YET");
			/*window.getSelection().removeAllRanges();
			var range = document.createRange();*/
		}
	};
}

//Map Speech
/*function mapSpeech(s) {
	"use strict";
	var i, sArr, wordMap = {};
	sArr = s;
	sArr = sArr.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
	sArr = sArr.split(" ");
	
	for (i = 0; i < sArr.length; i += 1) {
		if (sArr[i] in wordMap) {
			wordMap[sArr[i]] += 1;
		} else {
			wordMap[sArr[i]] = 1;
		}
	}
	
	window.console.log(wordMap);
}*/