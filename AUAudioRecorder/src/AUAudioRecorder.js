<<<<<<< HEAD
var AUAudioRecorder = function() {
=======
var AUAudioRecorder = function(audioContext) {
>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	var hasPermission = false;

	var mediaRecorder;

<<<<<<< HEAD
	var outputType = "audio/mp3; codecs=opus"; // Default is mp3
=======
	var outputType;
>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2

	var audio;	// This "audio" variable serves as the final recording by the user.
};


// Asks the user for their permission to access the computer's microphone.
AUAudioRecorder.prototype.requestPermission = function() {
	outputType = "audio/mp3; codecs=opus";
	if(navigator.getUserMedia) {
		// Definitions
		var constraints = { audio: true };
		var chunks = [];


		var onSuccess = function(stream) {
			// Initialize the media recorder
			mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.onstop = function(e) {
				// Create some new elements in the html
				var clipContainer = document.createElement('article');
				audio = document.createElement('audio');
				clipContainer.classList.add('clip');
				audio.setAttribute('controls', '');
				clipContainer.appendChild(audio);

				// Set some properties
				audio.controls = true;
<<<<<<< HEAD
  				var blob = new Blob(chunks, { 'type' : outputType });
=======
  				var blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2
  				chunks = [];
  				var audioURL = window.URL.createObjectURL(blob);
				audio.src = audioURL;
			} // End of onstop action.

			mediaRecorder.ondataavailable = function(e) {
				console.log("Recording data is available.");
				chunks.push(e.data);
			} // End of ondataavailable action.

		} // End of onSuccess

		var onError = function(err) {
			console.log("ERROR: " + err);
		} // End of onError

		navigator.getUserMedia(constraints, onSuccess, onError);
		this.hasPermission = true;
	} // End of if-supported-statement.
};


// Returns whether or not the program has the user's permission to use the microphone.
AUAudioRecorder.prototype.hasPermission = function() {
	return this.hasPermission;
};



// Starts the recording.
AUAudioRecorder.prototype.startRecording = function() {
	if (this.hasPermission == true) {
		mediaRecorder.start();
<<<<<<< HEAD
=======
		console.log("Recording");
>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2
	} else {
		this.requestPermission();
	}
};


// Stops the recording.
AUAudioRecorder.prototype.stopRecording = function() {
<<<<<<< HEAD
	if (this.hasPermission == true) {
		mediaRecorder.stop();
	} else {
		this.requestPermission();
	}
=======
	mediaRecorder.stop();

	// Create some new elements in the html
	var chunks = [];
	var clipContainer = document.createElement('article');
	audio = document.createElement('audio');
	clipContainer.classList.add('clip');
	audio.setAttribute('controls', '');
	clipContainer.appendChild(audio);

	// Set some properties
	audio.controls = true;
	var blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
	chunks = [];
	var audioURL = window.URL.createObjectURL(blob);
	audio.src = audioURL;
	console.log("Stopped Recording");
>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2
};


// Plays the recording.
AUAudioRecorder.prototype.play = function() {
	audio.play();
<<<<<<< HEAD
=======
	console.log("Playing");
>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2
};


// Pauses the recording.
AUAudioRecorder.prototype.pause = function() {
	audio.pause();
<<<<<<< HEAD
=======
	console.log("Paused");
>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2
};


// Stops the recording. Calling 'play' will start it from the beginning.
AUAudioRecorder.prototype.stop = function() {
	audio.pause();
	audio.currentTime = 0;
<<<<<<< HEAD
};


//
AUAudioRecorder.prototype.setOutputFileType = function(fileType) {
	outputType = "audio/" + fileType + "; codecs=opus";
}


=======
	console.log("Stopped");
};


AUAudioRecorder.prototype.setOutputFileType = function(fileType) {
	outputType = fileType;
}

>>>>>>> 90bc6a064c6c4db6be5a1d4a66219c66fe9b68d2
// Returns the audio object that contains the final recording.
AUAudioRecorder.prototype.getRecording = function() {
	return audio;
};