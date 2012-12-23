#Relief-Particles

The face-example displays particles that change color and position according to the user's webcam input. Each particle is assigned to a pixel from the webcam input and changes its color accordingly - and its z-position according to the brightness of that pixel.

The basics for this example are the same as for the other particle examples: `init`, `animate` and `addParticles` will get us a scene with particles.

##Individual color per particle

To create particles, you have to create a `ParticleSystem` and add a geometry and a material. You cannot assign materials to individual particles! So how can we then set colors per particle?

I changed `addParticles` a bit, so it gives us exactly what we want; the changes are small, with the following changes you can define colors on a per-particle basis:

 * add the option `vertexColors: true` to the `particleSystem`-material
  
  ```javascript```
function addParticles() {
	var particles = new THREE.Geometry(),
		mat = new THREE.ParticleBasicMaterial({
			color:0xffffff,
			vertexColors: true, // see this
			size: 20,
			map: THREE.ImageUtils.loadTexture('textures/particle.png'),
			blending: THREE.AdditiveBlending,
			transparent: true
		});
  ```

 * you can now specify an array of colors in the geometry of the `particleSystem`. For every particle in the geometry (`geometry.vertices`) you create an entry in the colors array (`geometry.colors`), the matching is done via same indices.

  ```javascript
  particles.colors = []; // the color array

	for (var y = 0; y < videoHeight; y++) {
		for (var x = 0; x < videoWidth; x++) {
			var v = new THREE.Vector3(
				(x - videoWidth/2) * 10,
				(y - videoHeight/2) * 10,
				0
			);

			particles.vertices.push(v); // add vertex

			particles.colors.push(new THREE.Color(0x000000)); // add color
		}
	}
  ```

This is it, you can now change the colors in the `geometry.colors` array to change the colors of the particles.

##Get pixel color data from webcam input

This is straightforward, look at the `addCam` function.

 * get the usermedia

  ```javascript
	navigator.getUserMedia_({
		audio: false,
		video: true
	}
  ```

 * create a video element, feed it with the webcam stream

  ```javascript
		var video = document.createElement("video");

		video.width = videoWidth;
		video.height = videoHeight;
		
		var domURL = window.URL || window.webkitURL;
		video.src = domURL ? domURL.createObjectURL(stream) : stream;
  ```

 * create a canvas on where you will copy/draw the videoframes of your video element to

  ```javascript
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');
  ```

 * draw the image from the video element to the canvas. You have to do this, to get the pixel data from each frame (because now, when the frame is on a canvas, you can use `getImageData` yay!)

  ```javascript

				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				
				var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  ```

  `getImageData().data` returns an array of pixel-rgba values. So you get the `r`, `g`, `b` and `a` (alpha) value of each pixel, but in a flat array. This means that one pixel covers 4 elements in this array. This is why the loop-head increases in steps of 4:

  ```javascript
	for (var i = 0, vi, c; i < pixels.length; i += 4) {
  ```

  To get the particle for this pixel, we calculate this back again:

  ```javascript
		vi = particleSystem.geometry.colors.length - i / 4 - 1;
  ```

  ...and read the RGB values and assign them to according entry in the `geometry.colors` array:

  ```javascript
		c = particleSystem.geometry.colors[vi];

		c.r = pixels[i] / 255;
		c.g = pixels[i+1] / 255;
		c.b = pixels[i+2] / 255;
  ```

  What's left? The positioning: we set the z-position of the particle to the average brightness of the r, g and b components of the pixel:

  ```javascript
  	particleSystem.geometry.vertices[vi].z = -(pixels[i] + pixels[i+2] + pixels[i+3]) / 3 * 2;
  ```
