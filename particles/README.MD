#Particles

This basic examples shows how to create particles and position them, apply a texture and render it.

The initial tasks for setting up scene, camera and canvas is taken into the `init`-function - it's the same code you know from the live-coding-example, nothing fancy.

The code specific for this example resides in its own function `addParticles`. As with a "normal" mesh, you need a material and a geometry. The particles are added to the geometry as its vertices and positioned individually inside the loop.

```javascript
function addParticles() {
	var particleCount = 1024,
		particles = new THREE.Geometry(),
		mat = new THREE.ParticleBasicMaterial({
			color:0xffffff,
			size: 20,
			map: THREE.ImageUtils.loadTexture('textures/particle.png'),
			blending: THREE.AdditiveBlending,
			transparent: true
		});

	// calculations for positioning particles in a square/rectangle
	var sideLength = Math.floor(Math.sqrt(particleCount)),
		d = 30,
		center = d * sideLength / 2;

	for (var i = 0, x, y, v; i < particleCount; i++) {
		x = i % sideLength * d - center;
		y = Math.floor(i / sideLength) * d - center;

		v = new THREE.Vector3(
			x,
			y,
			0
		);

		particles.vertices.push(v);
	}

	particleSystem = new THREE.ParticleSystem(particles, mat);

	scene.add(particleSystem);
}
```