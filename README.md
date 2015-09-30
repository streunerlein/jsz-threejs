#JSZurich - Three.JS

This repository holds example code and explanation for the examples shown in the **[JSZurich talk on 18. December 2012 - Christmas T(h)ree.js](http://techup.ch/911/jszurich-christmas-t-h-ree-js)**.

As I did all of the examples in the afternoons before the talk, I refactored some of the code to clean it up and make it more understandable (and not to embarrass myself). The code examples are not focussed on performance or elegance in any kind and provided on an as-is basis.

 * [JSZurich - Christmas T(h)ree.js on Techup](http://techup.ch/911/jszurich-christmas-t-h-ree-js)
 * [Watch the talk online](http://youtu.be/tdk_os2l6zQ)
 * [See all the examples online](http://streunerlein.github.com/jsz-threejs/)

##Examples

The examples are inside this repository, each in its own folder. For all the examples, please use Google Chrome - i did no compatibility-stuff to keep it simple.

I've added a readme to every example which explains some of the background shown in the example.

 * [See all the examples online](http://streunerlein.github.com/jsz-threejs/)

For some of the examples you have to activate `getUserMedia`, means Webcam-access and Microphone-access in your chrome flags (*chrome://flags*). If you cannot see the examples, watch the [recording of the talk](http://youtu.be/tdk_os2l6zQ).


###Live Coding Example (`live-coding-example/`)

![Live Coding Example](http://streunerlein.github.com/jsz-threejs/examples/live-coding-example/preview.jpg)

[See live demo](http://streunerlein.github.com/jsz-threejs/examples/live-coding-example/test.html)

This is the live coding example how it was made during the talk. Covered in this is the basic setup, render loops and creating objects. Also, animation!

**Hint:** Use your mouse to move the object (drag), click to trigger animation.

###Particle basics (`particles/`)

![Particle Basics](http://streunerlein.github.com/jsz-threejs/examples/particles/preview.jpg)

[See live demo](http://streunerlein.github.com/jsz-threejs/examples/particles/index.html)

Introduction to particles, create them and render.

**Hint:** Use your mouse to move the object (drag).

###Dancing particles with audio file input (`sound-in/`)

![Dancing particles](http://streunerlein.github.com/jsz-threejs/examples/sound-in/preview.jpg)

[See live demo](http://streunerlein.github.com/jsz-threejs/examples/sound-in/index.html)

Audio-API combined with particle movement.

**Hint:** Use mouse to move the object (drag).

###Dancing particles with microphone input (`mic-in/`)

![Dancing particles 2](http://streunerlein.github.com/jsz-threejs/examples/sound-in/preview.jpg)

[See live demo](http://streunerlein.github.com/jsz-threejs/examples/mic-in/index.html)

Audio-API combined with particle movement and user media.

**Hint:** Use mouse to move the object (drag).

###Relief particles - webcam input (`face/`)

![Relief particles](http://streunerlein.github.com/jsz-threejs/examples/face/preview.jpg)

[See live demo](http://streunerlein.github.com/jsz-threejs/examples/face/index.html)

Canvas/Video-API combined with particle coloring and movement, steered by the user's camera input.

**Hint:** Allow camera access and use mouse to move the object (drag).

###End scene: Moving Santa

![End scene](http://streunerlein.github.com/jsz-threejs/examples/end/preview.jpg)

[See live demo](http://streunerlein.github.com/jsz-threejs/examples/end/index.html)

Ending scene of the talk. Used in this examples: text rendering, model loading, lightning, grounds, fog, particles, vehicle steering, ... 

I did not do a explanatory readme for this as I don't want to write a huge book. I did also not refactor the code, but wrote it simple in the beginning. So you can still learn from this example by looking at the source code quite well.

**Hint:** Use mouse to look and keyboard (`W`, `A`, `S`, `D`, `Q`, `E`, `R`, `F` and the `arrow` keys) to move around.

You can steer the sleigh by opening the console and entering:

```CAMERACONTROL = false;```

Then, press enter.

##Running examples on your machine

Is perfectly possible. Make sure you have some kind of server running for that (do not open them directly from your file system). In most of the examples, AJAX requests have to be done which will fail. So put the files in your apache webroot, Express/node.js public folder, ... and load them from there.

##Links & Resources

 * [Three.js Repository on Github](https://github.com/mrdoob/three.js/)
 * [Three.js API Documentation](http://mrdoob.github.com/three.js/docs)
 * [Chrome Experiments](http://www.chromeexperiments.com/)
 * [Three.js Demo Selection](http://mrdoob.github.com/three.js/)

Make sure to check out the examples in the examples folder of the Three.js-repository.

###Third-party examples (in order of appearance in the talk)

 * http://hexgl.bkcore.com/ Race game
 * http://workshop.chromeexperiments.com/stars/ Solar system
 * http://data-arts.appspot.com/globe/ Population globe
 * http://www.zygotebody.com/ Zygote 3D Body
 * http://carvisualizer.plus360degrees.com/threejs/ Car with reflections
 * http://lights.elliegoulding.com/ Ellie Goulding WebGL Music video
 * http://superfad.com/missioncontrol/traffic/ Globe with particles on it
 * http://mrdoob.github.com/three.js/examples/webgl_materials_bumpmap_skin.html Lee Perry-Smith 3D head with displacement map
 * http://mrdoob.com/lab/javascript/webgl/kinect/ Kinect data in WebGL
 * http://neave.github.com/face-detection/ by neave Face detection with silly png
 * http://neave.com/webcam/html5/ Webcamtoys by neave (Instragram-Killer in HTML5 ;))


