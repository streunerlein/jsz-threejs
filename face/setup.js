
var renderer, scene, camera, controls, ground, clock, pCount = 0, particleSystem = null;
var renderhooks = [];

init();
animate();
addParticles();
addCam();

function addParticles() {
	var particleCount = 1024,
		particles = new THREE.Geometry(),
		mat = new THREE.ParticleBasicMaterial({
			color:0xffffff,
			vertexColors: true,
			size: 20,
			map: THREE.ImageUtils.loadTexture('textures/particle.png'),
			blending: THREE.AdditiveBlending,
			transparent: true
		});

	particles.colors = [];

	for (var y = 0; y < 120; y++) {
		for (var x = 0; x < 160; x++) {
			var v = new THREE.Vertex(new THREE.Vector3((x - 80)*10, (y - 60)*10, 0));
			particles.vertices.push(v);

			particles.colors.push(new THREE.Color(0x000000));
		}
	}

	particleSystem = new THREE.ParticleSystem(particles, mat);
	particleSystem.sortParticles = true;

	scene.add(particleSystem);
}

function addCam() {
	navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia_({
		audio: false,
		video: true
	}, function(stream) {
		var video = document.createElement("video");
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');

		video.width = 160;
		video.height = 120;

		setTimeout(function() {
			video.play();
			canvas.width = video.width;
			canvas.height = video.height;
		
			renderhooks.push(function() {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				
				var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

				for (var i = 0; i < pixels.length; i += 4) {
					var vi = particleSystem.geometry.colors.length - i / 4 - 1;
					var c = particleSystem.geometry.colors[vi];

					c.r = pixels[i] / 255;
					c.g = pixels[i+1] / 255;
					c.b = pixels[i+2] / 255;

					particleSystem.geometry.vertices[vi].z = -(pixels[i] + pixels[i+2] + pixels[i+3]) / 3 * 2;
				}
				particleSystem.geometry.needsUpdate = true;
				
			});
		}, 500);
		
		var domURL = window.URL || window.webkitURL;
		video.src = domURL ? domURL.createObjectURL(stream) : stream;

	}, function() {});

}

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 200;

	scene = new THREE.Scene();

	addParticles();

	controls = new THREE.TrackballControls(camera, renderer.domElement);
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