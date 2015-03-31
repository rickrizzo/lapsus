//Browser Check
if(!('webkitSpeechRecognition' in window)){	
	upgrade();
} else {
	
	//Variables
	var words = ["like", "um", "uh"];
	final_transcript = "";
	/*var speech; 
	var SpeechMap = mapSpeech(speech);
	var speechIndex = 0;*/
	

    //Recognition Variable
    var recognizing = false;
    var recognition = new webkitSpeechRecognition();
    var final_transcript;
	var ignore_onend;
	
	//API Options
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en-US";
	
	//On Start
	recognition.onstart = function(){
		recognizing = true;
		/*speech = document.getElementById("textarea").value;*/
		alert("Speak now");
	};
	
	//On Result
	recognition.onresult = function (event) {
	    var interim_transcript = '';
	    for (var i = event.resultIndex; i < event.results.length; ++i) {
	        if (event.results[i].isFinal) {
	            transcript = event.results[i][0].transcript;
	            //transcript = filler(transcript);
	            final_transcript += transcript;
	        } else {
	            interim_transcript += event.results[i][0].transcript;
	        }
	    }

		final_span.innerHTML = linebreak(final_transcript);
	    interim_span.innerHTML = linebreak(interim_transcript);
	}
	
	//On Error
	recognition.onerror = function(event){
		//Silence
		if(event.error == 'no-speech'){
			alert("Speak up!");
			ignore_onend = true;
		}
		//No Microphone
		if(event.error == 'audio-capture'){
			alert("Make sure you have a microphone conencted!");
			ignore_onend = true;
		}
		//No Allowed
		if(event.error == 'not-allowed'){
			alert("You can't do that");
			ignore_onend == true;
		}	
	};
	
	//On End
	recognition.onend = function(){
		recognizing = false;
		//startstoptoggle();
		if(ignore_onend){
			return;
		}
		//If no final transcript
		if(!final_transcript){
			return;
		}
		if(window.getSelection){
			/*window.getSelection().removeAllRanges();
			var range = document.createRange();*/
		}
	};
}
	

/*Functions for Results*/
//Variables
var two_line = /\n\n/g;
var one_line = /\n/g;
var first_char = /\S/;

//Upgrade
function upgrade(){
	alert("Please upgrade your browser! (Try Switching to Chrome)");
}

//Linebreak
function linebreak(s){
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

//Filler Words
/*function filler(s) {
	
	var tempSpeech = speech.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

	//Make Array
	s = s.split(" ");
	tempSpeech = tempSpeech.toUpperCase();
	tempSpeech = tempSpeech.split(" ");
	
	//Find Words
	for(var i = 0; i < s.length; i++){
		
		//Break Loop
		if(speechIndex == speech.length){
			break;
		}
		
		//Cases
		if(s[i].toUpperCase() == tempSpeech[speechIndex]){
			speechIndex ++;
		}else if(words.indexOf(s[i]) != -1){
		    //Blue
			s[i] = "<i>" + s[i] + "</i>";
		}else{
			//Red
		    s[i] = "<em>" + s[i] + "</em>";
			var match = false;
			while(match == false){
				for(var j = i; j < s.length; j++){
					if(s[j].toUpperCase() == tempSpeech[speechIndex + 1]){
						alert("HELLO");
						match = true;
						speechIndex ++;
						break;
					}
				}
			}
		}
	}
	
	return s.join(" ");
}*/

//Button Text Change WIP
function startstoptoggle(){
	//alert("Button Text Change called!");
	var buttonelem = document.getElementById("button");
	buttonelem.value = "HELLO";
	
	if (buttonelem.innerHTML == "Click to start"){
			buttonelem.innerHTML = "Click to stop";
	}else{
		buttonelem.innerHTML = "Click to start";
	}
}

//Map Speech
function mapSpeech(s){
	
	var sArr;
	var wordMap = {};
	sArr = s;
	sArr = sArr.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	sArr = sArr.split(" ");
	
	for(var i = 0; i < sArr.length; i++){
		if(sArr[i] in wordMap){
			wordMap[sArr[i]] += 1;
		}else{
			wordMap[sArr[i]] = 1;
		}
	}
	
	console.log(wordMap);
}
