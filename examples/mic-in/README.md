#Dancing Particles - microphone input

This is exactly the same example as sound-in ("Dancing particles - sound file input") - instead of the sound file, we're taking audio from the user's microphone.

The source is nearly identical, `init`, `animate`, `addParticles` are the same. The `initSound` function has been renamed to `initMic`, but in fact those functions are still very similar.

Here are the first bits of the `initMic` function that changed:

```javascript

function initMic() {

	navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia_({
		audio: true
	}, startaudio, function() {});

	var context = new webkitAudioContext();
	var analyser = context.createAnalyser();

	function startaudio(stream) {
		var mediaStreamSource = context.createMediaStreamSource(stream);
		mediaStreamSource.connect(analyser);

```

What we are doing:

 * get microphone access via getUserMedia

  ```javascript
	navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia_({
		audio: true
	}, startaudio, function() {});
  ```

 * as we have it, `startaudio` is given the media stream of the microphone

 * we create a media stream source out of it and add the analyser.

  ```javascript

	function startaudio(stream) {
		var mediaStreamSource = context.createMediaStreamSource(stream);
		mediaStreamSource.connect(analyser);
  ```

 * from this point on, the analyser behaves exactly the same as in the sound-in example.