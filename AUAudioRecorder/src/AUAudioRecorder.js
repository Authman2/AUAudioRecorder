var AUAudioRecorder = function(audioContext) {
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	var hasPermission = false;

	var mediaRecorder;

	var outputType;

	var audio;	// This "audio" variable serves as the final recording by the user.
};


// Asks the user for their permission to access the computer's microphone.
AUAudioRecorder.prototype.requestPermission = function() {
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
  				var blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
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
		console.log("Recording");
	} else {
		this.requestPermission();
	}
};


// Stops the recording.
AUAudioRecorder.prototype.stopRecording = function() {
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
};


// Plays the recording.
AUAudioRecorder.prototype.play = function() {
	audio.play();
	console.log("Playing");
};


// Pauses the recording.
AUAudioRecorder.prototype.pause = function() {
	audio.pause();
	console.log("Paused");
};


// Stops the recording. Calling 'play' will start it from the beginning.
AUAudioRecorder.prototype.stop = function() {
	audio.pause();
	audio.currentTime = 0;
	console.log("Stopped");
};


AUAudioRecorder.prototype.setOutputFileType = function(fileType) {
	outputType = fileType;
}

// Returns the audio object that contains the final recording.
AUAudioRecorder.prototype.getRecording = function() {
	return audio;
};