navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var permission = false;
var mediaRecorder = null;
var outputType = "audio/mp3; codecs=opus";
var audio = null;
var theblob = null;
var mediaStream = null;
var shouldLoop = false;
var playing = false;



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
                chunks = [];
            } // End of onstop action.

            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
                
                // Retrieve the audio.
                var audioURL = window.URL.createObjectURL(chunks[0]);
                var blob = new Blob(chunks, { 'type' : outputType });

                audio = new Audio(audioURL);
                theblob = blob;
            } // End of ondataavailable action.

        } // End of onSuccess

        var onError = function(err) {
            console.log("ERROR: " + err);
        } // End of onError

        permission = true;
        navigator.getUserMedia(constraints, onSuccess, onError);
    } // End of if-supported-statement.
};


/* Starts recording. */
exports.startRecording = function(callback) {
    if(mediaRecorder !== null) {
        // If you have permission, start recording
        if(permission === true) {
            mediaRecorder.start();
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
exports.stopRecording = function(callback) {
    if(mediaRecorder !== null) {
        // Only stop recording if the state is recording.
        if(mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
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
exports.play = function(callback) {
    if(audio !== null) {
        // Play the audio
        playing = true;
        audio.play();
    
    // Otherwise go to the callback.
    } else {
        if(callback) {
            callback("No audio was recorded, so nothing could be played.");
        }
    }
};


/* Pauses the recording. */
exports.pause = function(callback) {
    if(audio !== null) {
        audio.pause();
        playing = false;

    // Otherwise go to the callback.
    } else {
        if(callback) {
            callback("No audio was recorded, so nothing could be paused.");
        }
    }
};


/* Stops the recording from playing. Calling 'play' will start it from the beginning. */
exports.stop = function(callback) {
    if(audio !== null) {
        audio.pause();
        audio.currentTime = 0;
        playing = false;
    
    // Otherwise go to the callback.
    } else {
        if(callback) {
            callback("No audio was recorded, so there was nothing to stop playing.");
        }
    }
};


/* Loops the recorded audio. */
exports.loop = function(bool, callback) {
    if( audio !== null ) {
        (bool == true) ? audio.loop = true : audio.loop = false;
    } else {
        if(callback) {
            callback("No audio was recorded, so there is nothing to loop.");
        }
    }
};


/* Goes to the beginning of the audio. */
exports.stepBackward = function(callback) {
    if(audio !== null) {
        audio.currentTime = 0;
    } else {
        if(callback) {
            callback("No audio was recorded, so there is nothing to go to the beginning of.");
        }
    }
};


/* Goes to the end of the audio. */
exports.stepForward = function(callback) {
    if(audio !== null) {
        audio.currentTime = audio.duration;
    } else {
        if(callback) {
            callback("No audio was recorded, so there is nothing to go to the end of.");
        }
    }
};


/* Clears the current recording. */
exports.clear = function(callback) {
    audio = null;
    playing = false;

    if(callback) {
        callback();
    }
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
    return (permission === true) ? true : false;
};


/* Returns whether or not the audio will loop. */
exports.isLooping = function() {
    if(audio !== null) {
        return audio.loop;
    } else {
        return false;
    }
};


/* Returns whether or not the audio is currently playing. */
exports.isPlaying = function() {
    return playing;
};


/* Returns the audio object that contains the final recording. */
exports.getRecording = function() {
    if(audio !== null) {
        return audio;
    }
    return null;
};


/* Returns a Blob object, which can be used for file operations. */
exports.getRecordingFile = function() {
    if(theblob !== null) {
        return theblob;
    }
    return null;
};


/* This returns the media stream from the web audio API. */
exports.getStream = function() {
    if(mediaStream !== null) { 
        return mediaStream;
    }
    return null;
};


/* Returns the output file type. */
exports.getOutputType = function() {
    if(outputType !== null) { 
        return outputType;
    }
    return null;
};


/* Returns whether or not the audio is finished playing. */
exports.isFinished = function() {
    if(audio !== null) {
        return audio.ended;
    }
    return null;
};