//Browser Check
if(!('webkitSpeechRecognition' in window)){	
	upgrade();
} else {

    //Variables
    var ignore_onend;
    var sampleText = "I want to tell you a story.";
    var attempts = 0;
    console.log(sampleText);
    var textArr = sampleText.replace(/[\.,-\/#!$%\^&\*;:{}=\-_~()]/g, "").split(" ");
    var index = 0;

	
    //Recognition Variable
    var recognizing = false;
    var recognition = new webkitSpeechRecognition();
    var final_transcript = '';
	
	//API Options
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en-US";
	
	//On Start
	recognition.onstart = function(){
		recognizing = true;
		//startstoptoggle();
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
	
	//On Result
	recognition.onresult = function (event) {

		//Interim Text
		var interim_transcript = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) {

		    //Check Index in bounds
		    if (index == textArr.length) {
		        recognizing = false;
		        break;
		    }

			//Process Transcript
		    var transcript = event.results[i][0].transcript;
            

		    if (event.results[i].isFinal) {
		        final_transcript += transcript;
		        for (i in iMap) {
		            console.log(i + iMap[i]);
		        }
		    } else {
		        interim_transcript += transcript;
		        var temp = interim_transcript.split(" ");
		        for (elm in temp) {
		            if (elm in iMap) {
		                a[elm]++;
		            } else {
		                a[elm] = 1;
		            }
		        }
		    }
			
			//Check for mispronunciation
			//if (attempts > 10) {
			//    final_transcript += "<em>" + textArr[index] + "</em> ";
			//    attempts = 0;
			//    index += 1;
			//    console.log("INDEX" + index);
			//}else if(transcript.toLowerCase().search(textArr[index].toLowerCase()) != -1){
			//	final_transcript += textArr[index] + " ";
			//	attempts = 0;
			//	index += 1;
			//	console.log("INDEX" + index);
			//}
			
			//attempts += 1;
			
			//Output Transcript
			//interim_transcript += transcript;
			
			
		}
		
		////Final Text
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
	alert("Please upgrade your browser! (Try Switching to Chrome");
}

//Linebreak
function linebreak(s){
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

//Capitalize
function capitalize(s){
	return s.replace(first_char, function(m){return m.toUpperCase();})	;
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
		else{
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
