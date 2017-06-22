class AUAudioRecorder {

	constructor() {
		this.permission = false;
		this.mediaRecorder = null;
		this.outputType = "audio/mp3; codecs=opus";
		this.audio = null;
		this.theblob = null;
		this.mediaStream = null;
		this.shouldLoop = false;
		this.playing = false;
		
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}




	/************************
	*
	*       Modifiers
	*
	*************************/

	/* Asks the user for their permission to access the computer's microphone. */
	requestPermission() {
		if(navigator.getUserMedia) {
			// Definitions
			var constraints = { audio: true };
			var chunks = [];


			var onSuccess = (stream) => {
				// Initialize the media recorder
				this.mediaRecorder = new MediaRecorder(stream);
				this.mediaStream = stream;

				this.mediaRecorder.onstop = function(e) {
					chunks = [];
				} // End of onstop action.

				this.mediaRecorder.ondataavailable = (e) => {
					chunks.push(e.data);
					
					// Retrieve the audio.
					var audioURL = window.URL.createObjectURL(chunks[0]);
					var blob = new Blob(chunks, { 'type' : this.outputType });

					this.audio = new Audio(audioURL);
					this.theblob = blob;
				} // End of ondataavailable action.

			} // End of onSuccess

			var onError = (err) => {
				console.log("ERROR: " + err);
			} // End of onError

			this.permission = true;
			navigator.getUserMedia(constraints, onSuccess, onError);
		} // End of if-supported-statement.
	};


	/* Starts recording. */
	startRecording(callback) {
		if(this.mediaRecorder != null) {
			// If you have permission, start recording
			if(this.hasPermission() === true) {
				this.mediaRecorder.start();
			} else {
				// If you don't have permission, try running the callback.
				if(callback) {
					callback("You do not have permission to record.");
				}
			}
		// If the media recorder has not been created yet...
		} else {
			if(callback) {
				callback( "You need to give permission to your browser before recording." );
			}
		}
	};


	/* Stops the recording. */
	stopRecording(callback) {
		if(this.mediaRecorder != null) {
			// Only stop recording if the state is recording.
			if(this.mediaRecorder.state === 'recording') {
				this.mediaRecorder.stop();
			} else {
				// Otherwise, say that no recording could be stopped.
				if(callback) {
					callback("The audio recorder was not recording anything; there was nothing to stop recording.");
				}
			}
		// If the media recorder is not initialized.
		} else {
			if(callback) {
				callback("Audio recorder was not initialized. You may need to give permission to your browser to record.");
			}
		}
	};


	/* Plays the recording. */
	play(callback) {
		if(this.audio != null) {
			// Play the audio
			this.playing = true;
			this.audio.play();
		
		// Otherwise go to the callback.
		} else {
			if(callback) {
				callback("No audio was recorded, so nothing could be played.");
			}
		}
	};


	/* Pauses the recording. */
	pause(callback) {
		if(this.audio != null) {
			this.audio.pause();
			this.playing = false;

		// Otherwise go to the callback.
		} else {
			if(callback) {
				callback("No audio was recorded, so nothing could be paused.");
			}
		}
	};


	/* Stops the recording from playing. Calling 'play' will start it from the beginning. */
	stop(callback) {
		if(this.audio != null) {
			this.audio.pause();
			this.audio.currentTime = 0;
			this.playing = false;
		
		// Otherwise go to the callback.
		} else {
			if(callback) {
				callback("No audio was recorded, so there was nothing to stop playing.");
			}
		}
	};


	/* Loops the recorded audio. */
	loop(bool, callback) {
		if( this.audio != null ) {
			(bool == true) ? this.audio.loop = true : this.audio.loop = false;
		} else {
			if(callback) {
				callback("No audio was recorded, so there is nothing to loop.");
			}
		}
	};


	/* Goes to the beginning of the audio. */
	stepBackward(callback) {
		if(this.audio != null) {
			this.audio.currentTime = 0;
		} else {
			if(callback) {
				callback("No audio was recorded, so there is nothing to go to the beginning of.");
			}
		}
	};


	/* Goes to the end of the audio. */
	stepForward(callback) {
		if(this.audio != null) {
			this.audio.currentTime = this.audio.duration;
		} else {
			if(callback) {
				callback("No audio was recorded, so there is nothing to go to the end of.");
			}
		}
	};


	/* Clears the current recording. */
	clear(callback) {
		this.audio = null;
		this.playing = false;

		if(callback) {
			callback();
		}
	};


	/* Sets the file type for the audio recording.
	Ex.) mp3, wav, ogg, etc.... */
	setOutputFileType(fileType) {
		this.outputType = "audio/" + fileType + "; codecs=opus";
	};




	/************************
	*
	*       Accessors
	*
	*************************/


	/* Returns whether or not the program has the user's permission to use the microphone. */
	hasPermission() {
		return (this.permission == true) ? true : false;
	};


	/* Returns whether or not the audio will loop. */
	isLooping() {
		if(this.audio != null) {
			return this.audio.loop;
		} else {
			return false;
		}
	};


	/* Returns whether or not the audio is currently playing. */
	isPlaying() {
		return this.playing;
	};


	/* Returns the audio object that contains the final recording. */
	getRecording() {
		if(this.audio != null) {
			return this.audio;
		}
		return null;
	};


	/* Returns a Blob object, which can be used for file operations. */
	getRecordingFile() {
		if(this.theblob != null) {
			return this.theblob;
		}
		return null;
	};


	/* This returns the media stream from the web audio API. */
	getStream() {
		if(this.mediaStream != null) { 
			return this.mediaStream;
		}
		return null;
	};


	/* Returns the output file type. */
	getOutputType() {
		if(this.outputType != null) { 
			return this.outputType;
		}
		return null;
	};


	/* Returns whether or not the audio is finished playing. */
	isFinished() {
		if(this.audio != null) {
			return this.audio.ended;
		}
		return null;
	};

};

export default AUAudioRecorder;