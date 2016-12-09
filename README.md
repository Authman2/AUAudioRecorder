# AudioRecorder

An audio recorder written in Javascript and HTML. The main audio recorder is in the file 'AUAudioRecorder.js' which contains the AUAudioRecorder object. To see a very simple example of the audio recorder at work, navigate to the 'RecorderTester.html' file in the Example folder.

# Methods
- **startRecording()**: Starts the recording process. If the program does not have permission to access the computer’s microphone yet, it will ask the user for it.
- **stopRecording()**: Stops recording and saves the recorded audio into a variable with a file type that can be specified by another method.
- **play()**: Plays the recorded audio in the browser.
- **pause()**: Pauses the audio that is playing. when the play button is clicked again the audio will resume from where it was.
- **stop()**: Stops the audio from playing and sends it back to the beginning.
- **stepBackward()**: Starts the audio from the beginning but does not pause it.
- **stepForward()**: Sends the audio to the end. Basically just stops it from playing by doing this.
- **clear()**: Deletes the currently recorded audio.
- **requestPermission()**: Asks the user for permission to access the computer’s microphone. This is automatically called by the startRecording() method if permission was not already given, however permission can be requested beforehand by calling this method.
- **hasPermission()**: Returns true/false if the user has given permission to use the computer's microphone.
- **getRecording()**: Returns an audio object that contains the recorded audio.
- **setOutputFileType(fileType)**: Sets the type of file that the audio will be formatted to. The "fileType" parameter is the file extension that you would like to use (i.e. mp3, wav, ogg). The default file type is mp3.
- **getStream()**: Returns the stream used by the Web Audio API that handles the recording. This method would be useful if one would like to do other things with the Web Audio API such as drawing it on a canvas or adding sound effects. 


# How To
- Step 1: Add the script to your HTML file like so:
```html
<script type="text/javascript" src="https://adeolauthman.squarespace.com/s/AUAudioRecorder.js"></script>
```
- Step 2: Assuming you have already created buttons in your HTML file and already have your own Javascript file for your webpage, you can create a new AUAudioRecorder object and call methods from it when buttons are clicked.
```javascript
var audioRec = new AUAudioRecorder();


audioRec.hasPermission();
audioRec.requestPermission();
audioRec.startRecording();
audioRec.stopRecording();
audioRec.play();
audioRec.pause();
audioRec.stop();
audioRec.stepBackward();
audioRec.stepForward();
audioRec.clear();
audioRec.getRecording();
audioRec.setOutputFileType("mp3");
audioRec.getStream();


```

# Author
- Year: 2016
- Languages: HTML, Javascript
- Programmer: Adeola Uthman
