# Dancing Particles - file input

This example shows particles arranged in a big sphere where each particle reacts on the amplitude of a certain frequency in a given audio track.

I took the initial stuff like creating a renderer, scene and camera again into an own function `init` and the animation loop into `animate`.

## Particles arranged as big sphere

The `addParticles` function adds the particles to the scene, arranged as a sphere. 

See the particles-example for the basics of creating particles. Here i'm going to explain how the particles are arranged in a sphere.

```javascript
function addParticles() {
	var radius = 500;
	var particleCount = 1024,
		particles = new THREE.Geometry(),
		mat = new THREE.ParticleBasicMaterial({
			color:0xffffff,
			size: 20,
			map: THREE.ImageUtils.loadTexture('textures/particle.png'),
			blending: THREE.AdditiveBlending,
			transparent: true
		});

	var template = new THREE.SphereGeometry(radius, Math.sqrt(, 32);

	for (var i = 0; i < particleCount; i++) {
		var v = template.vertices[i].clone();
		particles.vertices.push(template.vertices[i]);
		particles.vertices[i].orgposition = new THREE.Vector3(
			v.x,
			v.y,
			v.z
		);
	}

	particleSystem = new THREE.ParticleSystem(particles, mat);
	particleSystem.sortParticles = true;

	scene.add(particleSystem);

	pCount = particleCount;
}
```

As you see, I created a sphere geometry as a template. Segments and rings (2. and 3. parameters) are square roots of the maximum count we want (which makes kinda sense). What we're doing here is effectively the following: let THREE.js find out the position of 1024 particles arranged as a sphere for us, then use this as a template to position our particles.

```javascript```
	var template = new THREE.SphereGeometry(radius, Math.sqrt(particleCount), Math.sqrt(particleCount));
```

This is what we're doing in the loop where we create the particles. For every particle we create a new vertex in the geometry of the particle system and set it to the position of our template. Additionally, we save the position as "original position" for later use into the vertex of the specific particle.

```javascript
	for (var i = 0; i < particleCount; i++) {
		var v = template.vertices[i].clone();
		particles.vertices.push(template.vertices[i]);
		particles.vertices[i].orgposition = new THREE.Vector3(
			v.x,
			v.y,
			v.z
		);
	}
```

## Adding the sound file and read audio frequencies

This section is packed into the function `initSound`. For achieving the effect we want, what we do is:

 * `GET` the audio file as binary

   ```javascript
   var request = new XMLHttpRequest();
   request.open('GET', url, true);
   request.responseType = 'arraybuffer';
   ```

 * decode it comes in (from binary) and use it directly in an audio context where we can assign an analyzer to that will give us frequency data

   ```javascript
   request.onload = function() {
   	context.decodeAudioData(request.response, function(buffer) {
   		source = context.createBufferSource();
   		source.buffer = buffer;

   		source.connect(context.destination);
   		source.connect(analyser);
   		source.noteOn(0);
   		startaudio();
   ```

 * `startaudio` is called has been decoded and the track has started playing (with `source.noteOn(0)`)

 * inside `startaudio` we add a render hook (which is adding a function to the animation loop, so it gets executed each frame)

 * inside this function, we get the frequency data of the played audio out of our analyer

   ```javascript
			var data = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(data);
   ```

   and calculate the frequency data down so it matches our number of particles

   ```javascript
			var bin_size = Math.floor(data.length / pCount);
   ```

 * then each particle the average amplitude of the frequencies one particle covers is calculated and the particle is moved on its vector according to the amplitude

   ```javascript
   			for (var i = 0; i < pCount; i++) {
				var sum = 0;

				for (var j =0; j < bin_size; j++) {
					sum += data[(i * bin_size) + j];
				}

				var average = sum / bin_size;

				var particle = particleSystem.geometry.vertices[i];
				var magnitude = average / 256;

				var v = particle.orgposition.clone();

				v.multiplyScalar(1 + magnitude);
				particle.x = v.x;
				particle.y = v.y;
				particle.z = v.z;
			}
   ```   