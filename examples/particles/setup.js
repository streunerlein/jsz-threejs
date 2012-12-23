
var renderer, scene, camera, controls;

init();
animate();
addParticles();

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

	var particleSystem = new THREE.ParticleSystem(particles, mat);

	scene.add(particleSystem);
}

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 200;
	camera.position.z = -1000;

	scene = new THREE.Scene();

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	controls.movementSpeed = 2500;
	controls.rollSpeed = Math.PI / 6;
	controls.autoForward = false;
}


function animate() {
	requestAnimationFrame(animate);

	controls.update();

	renderer.render(scene, camera);
}