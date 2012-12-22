
var renderer, scene, camera, controls, ground, clock, pCount = 0, particleSystem = null;
var renderhooks = [];

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

	particleSystem = new THREE.ParticleSystem(particles, mat);

	scene.add(particleSystem);
}

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 200;

	scene = new THREE.Scene();

	addParticles();

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	clock = new THREE.Clock();

	camera.position.z = -1000;

	controls.movementSpeed = 2500;
	controls.rollSpeed = Math.PI / 6;
	controls.autoForward = false;

	scene.fog = new THREE.Fog( 0x000000, 1500, 5000 );
	scene.fog.color.setHSV( 0.51, 0.6, 0.025 );
}


function animate() {
	requestAnimationFrame(animate);

	TWEEN.update();

	controls.update(clock.getDelta());

	for (var i = 0; i < renderhooks.length; i++) {
		renderhooks[i]();
	}

	renderer.render(scene, camera);
}