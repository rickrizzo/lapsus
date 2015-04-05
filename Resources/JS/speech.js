//Variables
var two_line = /\n\n/g;
var one_line = /\n/g;
var first_char = /\S/;
var transcript;
var wordMap = {};
var fillerWords = ["uh", "um", "so", "like", "yeah"];
var weakWords = 2;

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

//Check Filler Words
function checkFillers() {
  //Variables
  var i, j;
  var speech = final_transcript;
  
  //Create Speech Array
  speech = speech.split(" ");
  
  for (i = 0; i < speech.length; i += 1) {
    
    //Check Words
    for (j = 0; j < fillerWords.length; j += 1) {
      if (speech[i].toLowerCase() == fillerWords[j]) {
        if (j - weakWords < 0) {
          speech[i] = "<em>" + speech[i] + "</em>";
        } else {
          speech[i] = "<strong>" + speech[i] + "</strong>";
        }
      } 
    }
    
    //Map Words
    if (speech[i] in wordMap) {
      wordMap[speech] += 1;
    } else {
      wordMap[speech] = 0;
    }
  }
  
  document.getElementById("final_span").innerHTML = speech.join(" ");
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
	      final_transcript += transcript;
	    } else {
	      interim_transcript += event.results[i][0].transcript;
	    }
	  }

    //Display Text
		document.getElementById("final_span").innerHTML = linebreak(final_transcript);
    document.getElementById("interim_span").innerHTML = linebreak(interim_transcript);
    transcript = final_transcript;
	};
	22
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
    checkFillers();
        
        //Ignore End
		if (ignore_onend) {
			return;
		}
		//If no final transcript
		if (!final_transcript) {
			return;
		}
		if (window.getSelection) {
			/*window.getSelection().removeAllRanges();
			var range = document.createRange();*/
		}
	};
}