//Check Correct Vender Prefix
navigator.getUserMedia = 	navigator.getUserMedia || 
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.ms.GetUserMedia;

//Error Handling
var errCallback = function(e){
	console.log("Error: ", e);
};

//Request Media
function requestMedia(){
	//e.preventDefault();
	navigator.getUserMedia({video: true, audio: false}, showMedia, errCallback);
}

//Create Stream
function showMedia(stream){
	var video = document.getElementById('userMedia');
	video.src = window.URL.createObjectURL(stream);
	
	video.onloadedmetadata = function(e){
		console.log("Recording");
	};
}