
var renderer, scene, camera, controls, clock, pCount = 0, particleSystem = null;
var renderhooks = [];

init();
animate();
initMic();

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

		renderhooks.push(function() {
			var data = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(data);

			var bin_size = Math.floor(data.length / pCount);

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
		});
	}
}

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

	var template = new THREE.SphereGeometry(radius, Math.sqrt(particleCount), Math.sqrt(particleCount));

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