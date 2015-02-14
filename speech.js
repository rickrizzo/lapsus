//Variables
var recognizing = false;
var final_transcript = '';
var ignore_onend;

//Speech Recognition
if(!('webkitSpeechRecognition' in window)){	
	
	//If Not on Webkit
	upgrade();

}else{
	
	//Recognition Variable
	var recognition = new webkitSpeechRecognition();
	
	//API Options
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en-US";
	
	//On Start
	recognition.onstart = function(){
		recognizing = true;
	};
	
	//On Error
	recognition.onerror = function(event){
		//Silence
		if(event.error == 'no-speech'){
			ignore_onend = true;
		}
		//No Microphone
		if(event.error == 'audio-capture'){
			ignore_onend = true;
		}
		//No Allowed
		if(event.error == 'not-allowed'){
			ignore_onend == true;
		}	
	};
	
	//On End
	recognition.onend = function(){
		recognizing = false;
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
	
	//On Result
	recognition.onresult = function(event){
		//Interim Text
		var interim_transcript = '';
		for(var i = event.resultIndex; i < event.results.length; ++i){
			if(event.results[i].isFinal){
				final_transcript += event.results[i][0].transcript;
			}else{
				interim_transcript += event.results[i][0].transcript;
			}
		}
		
		//Final Text
		final_transcript = capitalize(final_transcript);
		final_span.innerHTML = linebreak(final_transcript);
		interim_span.innerHTML = linebreak(interim_transcript);
		if(final_transcript||interim_transcript){
			//showButtons('inline-block');
		}
	};
}

/*Functions*/
//Variables
var two_line = /\n\n/g;
var one_line = /\n/g;
var first_char = /\s/g;

//Upgrade
function upgrade(){
	alert("Please upgrade your browser!");
}

//Linebreak
function linebreak(s){
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

//Capitalize
function capitalize(s){
	return s.replace(first_char, function(m){return m.toUpperCase();});
}

