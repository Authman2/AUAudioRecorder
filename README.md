# AudioRecorder

An audio recorder written in Javascript and HTML. The main audio recorder is in the file 'AUAudioRecorder.js' which contains the AUAudioRecorder object. To see a very simple example of the audio recorder at work, navigate to the 'RecorderTester.html' file in the Example folder.

# Methods
- **startRecording()**: <br>Starts the recording process. The method "requestPermission()" must be called first so that the program has permission to access the computer's microphone.
```javascript
audioRec.startRecording();
```
- **stopRecording()**: <br>Stops recording and saves the recorded audio into a variable with a file type that can be specified by another method.
```javascript
audioRec.stopRecording();
```
- **play()**: <br>Plays the recorded audio in the browser.
```javascript
audioRec.play();
```
- **pause()**: <br>Pauses the audio that is playing. when the play button is clicked again the audio will resume from where it was.
```javascript
audioRec.pause();
```
- **stop()**: <br>Stops the audio from playing and sends it back to the beginning.
```javascript
audioRec.stop();
```
- **loop(bool)**: <br>Sets whether or not the audio should loop once it is played. Set the parameter "bool" to true or false for your desired option.
```javascript
audioRec.loop(true);
```
- **stepBackward()**: <br>Starts the audio from the beginning but does not pause it.
```javascript
audioRec.stepBackward();
```
- **stepForward()**: <br>Sends the audio to the end. Basically just stops it from playing by doing this.
```javascript
audioRec.stepForward();
```
- **clear()**: <br>Deletes the currently recorded audio.
```javascript
audioRec.clear();
```
- **isFinished()**: <br>Returns whether or not the audio is finished playing.
<br>
```
audioRec.isFinished();
```
- **requestPermission()**: <br>Asks the user for permission to access the computer’s microphone. 
```javascript
audioRec.requestPermission();
```
- **hasPermission()**: <br>Returns true/false if the user has given permission to use the computer's microphone.
```javascript
audioRec.hasPermission();
```
- **getRecording()**: <br>Returns an audio object that contains the recorded audio.
```javascript
audioRec.getRecording();
```
- **setOutputFileType(fileType)**: <br>Sets the type of file that the audio will be formatted to. The "fileType" parameter is the file extension that you would like to use (i.e. mp3, wav, ogg). The default file type is mp3.
```javascript
audioRec.setOutputFileType("mp3");
```
- **getStream()**: <br>Returns the stream used by the Web Audio API that handles the recording. This method would be useful if one would like to do other things with the Web Audio API such as drawing it on a canvas or adding sound effects.
```javascript
audioRec.getStream();
```


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
audioRec.loop(true);
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
