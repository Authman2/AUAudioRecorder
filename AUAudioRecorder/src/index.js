var permission = false;

var mediaRecorder;

var outputType = "audio/mp3; codecs=opus"; // Default is mp3

var audio;	// This "audio" variable serves as the final recording by the user.

var theblob;   // The blob that can be used for file operations.

var mediaStream;

var shouldLoop = false;

var playing = false;

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

/************************
*
*       Modifiers
*
*************************/

/* Asks the user for their permission to access the computer's microphone. */
exports.requestPermission = function() {
	if(navigator.getUserMedia) {
		// Definitions
		var constraints = { audio: true };
		var chunks = [];


		var onSuccess = function(stream) {
			// Initialize the media recorder
			mediaRecorder = new MediaRecorder(stream);
			mediaStream = stream;

			mediaRecorder.onstop = function(e) {
				// Create some new elements in the html
				var clipContainer = document.createElement('article');
				clipContainer.classList.add('clip');
				audio = document.createElement('audio');
				audio.setAttribute('controls', '');
				clipContainer.appendChild(audio);

				// Set some properties
				audio.controls = true;
  				var blob = new Blob(chunks, { 'type' : outputType });
  				chunks = [];
  				var audioURL = window.URL.createObjectURL(blob);
				audio.src = audioURL;
                theblob = blob;
			} // End of onstop action.

			mediaRecorder.ondataavailable = function(e) {
				chunks.push(e.data);
			} // End of ondataavailable action.

		} // End of onSuccess

		var onError = function(err) {
			console.log("ERROR: " + err);
		} // End of onError

		permission = true;
		navigator.getUserMedia(constraints, onSuccess, onError);
	} // End of if-supported-statement.
};


/* Starts the recording. */
exports.startRecording = function() {
	if(mediaRecorder != null) {
        mediaRecorder.start();
    }
};


/* Stops the recording. */
exports.stopRecording = function() {
    if(mediaRecorder != null) {
	   mediaRecorder.stop();
    }
};


/* Plays the recording. */
exports.play = function() {
	if(audio != null) {
        audio.play();
        playing = true;
    }
};


/* Pauses the recording. */
exports.pause = function() {
	if(audio != null) {
        audio.pause();
        playing = false;
    }
};


/* Stops the recording from playing. Calling 'play' will start it from the beginning. */
exports.stop = function() {
    if(audio != null) {
        audio.pause();
        audio.currentTime = 0;
        playing = false;
    }
};


/* Loops the recorded audio. */
exports.loop = function(bool) {
    if( audio != null ) {
        (bool == true) ? audio.loop = true : audio.loop = false;
    }
};


/* Goes to the beginning of the audio. */
exports.stepBackward = function() {
	if(audio != null) {
        audio.currentTime = 0;
    }
};


/* Goes to the end of the audio. */
exports.stepForward = function() {
    if(audio != null) {
	   audio.currentTime = audio.duration;
    }
};


/* Clears the current recording. */
exports.clear = function() {
	audio = null;
    playing = false;
};


/* Sets the file type for the audio recording.
Ex.) mp3, wav, ogg, etc.... */
exports.setOutputFileType = function(fileType) {
	outputType = "audio/" + fileType + "; codecs=opus";
};




/************************
*
*       Accessors
*
*************************/


/* Returns whether or not the program has the user's permission to use the microphone. */
exports.hasPermission = function() {
	if(permission == undefined) return false;
	return (permission == true) ? true : false;
};


/* Returns whether or not the audio will loop. */
exports.isLooping = function() {
    if(audio != null && (typeof(audio) != null) && audio !== undefined) {
        if(audio.loop == true) { return true; } else { return false; }
    }
};


/* Returns whether or not the audio is currently playing. */
exports.isPlaying = function() {
    if(audio != null && (typeof(audio) != null) && audio !== undefined) {
        if( (audio.currentTime == audio.duration && audio.loop == false) || (audio.currentTime == 0) || (AUAudioRecorder.prototype.isFinished())) {
            return false;
        } else {
            return true;
        }
    }
    return false;
};


/* Returns the audio object that contains the final recording. */
exports.getRecording = function() {
    if(audio != null) { return audio; }
	return null;
};


/* Returns a Blob object, which can be used for file operations. */
exports.getRecordingFile = function() {
    return theblob;
};


/* This returns the media stream from the web audio API. */
exports.getStream = function() {
    if(mediaStream != null && (typeof(mediaStream) != null) && mediaStream !== undefined) { return mediaStream; }
	return null;
};


/* Returns the output file type. */
exports.getOutputType = function() {
    if(outputType != null && (typeof(outputType) != null) && outputType !== undefined) { return outputType; }
    return null;
};


/* Returns whether or not the audio is finished playing. */
exports.isFinished = function() {
	if(audio != null && (typeof(audio) != null) && audio !== undefined) { return audio.ended; }
	return null;
};