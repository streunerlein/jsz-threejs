#JSZurich - Three.JS

This repository holds example code and explanation for the examples shown in the JSZurich talk on 18. December 2012 - "Christmas T(h)ree.js".

As I did all of the examples in the afternoons before the talk, I refactored some of the code to clean it up and make it more understandable (and not to embarrass myself). The code examples are not focussed on performance or elegance in any way and provided on an as-is basis.

 * [JSZurich - Christmas T(h)ree.js on Techup](http://techup.ch/911/jszurich-christmas-t-h-ree-js)

 * [Watch the talk online [link to come]](http://google.com)

##Run examples on your machine

Is perfectly possible. Make sure you have some kind of server running for that (do not open them directly from your file system). In many of the examples, AJAX requests have to be made which will fail. So put the files in your apache webroot, Express/node.js public folder, ...

##Examples

The examples are inside this repository, each in its own folder. For all the examples, please use Google Chrome - i did no compatibility-stuff to keep it simple.

I've added a readme to every example which explains some of the background shown in the example.

 * [See all the examples online](http://streunerlein.github.com/jsz-threejs/)

For some of the examples you have to activate `getUserMedia`, means Webcam-access and Microphone-access in your [chrome flags](about://flags). If you cannot see the examples, watch the recording of the talk.


 * Live Coding Example (`live-coding-example/`)

	![Live Coding Example](http://streunerlein.github.com/jsz-threejs/live-coding-example/preview.jpg)

	This is the live coding example how it was made during the talk. Covered in this is the basic setup, render loops and creating objects. Also, animation!

	**Hint:** Use your mouse to move the object (drag), click to trigger animation.

 * Particle basics (`particles/`)

	![Particle Basics](http://streunerlein.github.com/jsz-threejs/particles/preview.jpg)

	Introduction to particles, create them and render.

	**Hint:** Use your mouse to move the object (drag).

 * Dancing particles with audio file input (`sound-in/`)

	![Particle Basics](http://streunerlein.github.com/jsz-threejs/sound-in/preview.jpg)

	Audio-API combined with particle movement.

	**Hint:** Use mouse to move the object (drag).

 * Dancing particles with microphone input (`mic-in/`)

	![Particle Basics](http://streunerlein.github.com/jsz-threejs/sound-in/preview.jpg)

	Audio-API combined with particle movement and user media.

	**Hint:** Use mouse to move the object (drag).

 * Relief particles - webcam input (`face/`)

	![Particle Basics](http://streunerlein.github.com/jsz-threejs/face/preview.jpg)

	Canvas/Video-API combined with particle coloring and movement, steered by the user's camera input.

	**Hint:** Allow camera access and use mouse to move the object (drag).

 * End scene: Moving Santa

	![Particle Basics](http://streunerlein.github.com/jsz-threejs/end/preview.jpg)

	Canvas/Video-API combined with particle coloring and movement, steered by the user's camera input.

	**Hint:** Use mouse to look and keyboard (`W`, `A`, `S`, `D`, `Q`, `E`, `R`, `F` and the `arrow` keys) to move around.

	You can steer the sleigh by opening the console and entering:

	```CAMERACONTROL = false;```

	Then, press enter.
