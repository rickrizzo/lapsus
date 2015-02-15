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
		    if (event.results[i].isFinal) {
		        //Check for Filler Words
		        var transcript = filler(event.results[i][0].transcript);
			    final_transcript += transcript;
		    } else {
                /*Create function to increase um recognition confidence*/
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

/*Functions for Results*/
//Variables
var two_line = /\n\n/g;
var one_line = /\n/g;
var first_char = /\S/;

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

//Filler Words
function filler(s) {
    if (s.search("um") != -1) {
        var index = s.search("um");
        var p1 = s.slice(0, index);
        var p2 = s.slice(index + 2);
        var word = s.slice(index, index + "um".length);
        return p1 + "<em>" + word + "</em>" + p2;
    } else {
        return s;
    }
}