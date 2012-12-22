
var renderer, scene, camera, controls, ground, clock, pCount = 0, particleSystem = null;
var renderhooks = [];

init();
animate();
addParticles();

function addParticles() {
	var radius = 500;
	var particleCount = 1024,
		particles = new THREE.Geometry(),
		mat = new THREE.ParticleBasicMaterial({
			color:0xffffff,
			size: 20,
			map: THREE.ImageUtils.loadTexture('../end/textures/ParticleSmoke.png'),
			blending: THREE.AdditiveBlending,
			transparent: true
		});

	var template = new THREE.PlaneGeometry(1024, 1024, 31, 32);

	particles.colors = [];

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
	particleSystem.vertexColors = true;

	particleSystem.radius = radius;

	scene.add(particleSystem);

	pCount = particleCount;
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