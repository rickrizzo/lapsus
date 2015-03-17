//Browser Check
if(!('webkitSpeechRecognition' in window)){	
	upgrade();
} else {
	
	//Variables
	var words = ["like", "um", "uh"];
	var speech; 
	var speechIndex = 0;
	

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
		final_transcript = "";
		speech = document.getElementById("textarea").value;
		alert(speech);
	};
	
	//On Result
	recognition.onresult = function (event) {
	    var interim_transcript = '';
	    for (var i = event.resultIndex; i < event.results.length; ++i) {
	        if (event.results[i].isFinal) {
	            transcript = event.results[i][0].transcript;
	            transcript = filler(transcript);
	            final_transcript += transcript;
	        } else {
	            interim_transcript += event.results[i][0].transcript;
	        }
	    }
		
		//Display Transcript
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
function filler(s) {

    /*Add punctionation stripping*/
	var tempSpeech = speech.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

	//Make Array
	s = s.split(" ");
	tempSpeech = tempSpeech.split(" ");
	if(speechIndex >= speech.length){
		return;
	}
	
	//Find Words
	for(var i = 0; i < s.length; i++){
		
		//Break Loop
		if(speechIndex == speech.length){
			break;
		}
		
		//Cases
		if(s[i].toUpperCase() == tempSpeech[speechIndex].toUpperCase()){
			speechIndex ++;
		}else if(words.indexOf(s[i]) != -1){
		    s[i] = "<i>" + s[i] + "</i>";
		    //speechIndex = findNext(s, i);
		}else{
		    s[i] = "<em>" + s[i] + "</em>";
		    //speechIndex = findNext(s, i);
		}
	}
	
	return s.join(" ");
}

//Find Next Match
function findNext(s, index){
    
    //Set to 
    index = -1;

    //Find Next Index of Match
    while(index == -1 && speechIndex < speech.length){
        for (var i = index; i < s.length; i++) {
            if (s[i] == speech[speechIndex]) {
                index = i;
                break;
            }
        }
        speechIndex++;
    }

    return index;
}


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



//Frequency Table

/*
	WIP
	This function will use two arrays to keep track of how often
	words are used in the final transcript. 	
*/

    function freqtable(ftrans) {

        var wordcounts = new Map();
        var inputwords = "";

        while (i != ftrans.length) {	//Add all words to the frequency table
            if (ftrans[i] != " ") {	//Build the word to place into array
                inputword += ftrans[i];
                ++i;
            }
            else {
                var count;
                count = wordcounts.get(inputword);
                if (count) {	//Increment word occurrence
                    wordcounts.set(inputword, count + 1);
                }
                else {	//Add the word with an occurrence of one
                    wordcounts.set(inputword, 1);
                }
                ++i;
            }
        }

        //debug
        console.log(wordcounts.get("hi"));

    }
