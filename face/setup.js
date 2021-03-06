
var renderer, scene, camera, controls, ground, clock, pCount = 0, particleSystem = null;
var renderhooks = [];
var videoWidth = 160, videoHeight = 120;

init();
animate();
addParticles();
addCam();

function addCam() {
	navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getUserMedia_({
		audio: false,
		video: true
	}, function(stream) {
		var video = document.createElement("video");

		video.width = videoWidth;
		video.height = videoHeight;
		
		var domURL = window.URL || window.webkitURL;
		video.src = domURL ? domURL.createObjectURL(stream) : stream;
		
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');

		setTimeout(function() {
			video.play();
			canvas.width = video.width;
			canvas.height = video.height;
		
			renderhooks.push(function() {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				
				var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

				for (var i = 0, vi, c; i < pixels.length; i += 4) {
					vi = particleSystem.geometry.colors.length - i / 4 - 1;
					c = particleSystem.geometry.colors[vi];

					c.r = pixels[i] / 255;
					c.g = pixels[i+1] / 255;
					c.b = pixels[i+2] / 255;

					particleSystem.geometry.vertices[vi].z = -(pixels[i] + pixels[i+2] + pixels[i+3]) / 3 * 2;
				}
				
			});
		}, 500);

	}, function() {});
}

function addParticles() {
	var particles = new THREE.Geometry(),
		mat = new THREE.ParticleBasicMaterial({
			color:0xffffff,
			vertexColors: true,
			size: 20,
			map: THREE.ImageUtils.loadTexture('textures/particle.png'),
			blending: THREE.AdditiveBlending,
			transparent: true
		});

	particles.colors = [];

	for (var y = 0; y < videoHeight; y++) {
		for (var x = 0; x < videoWidth; x++) {
			var v = new THREE.Vector3(
				(x - videoWidth/2) * 10,
				(y - videoHeight/2) * 10,
				0
			);

			particles.vertices.push(v);

			particles.colors.push(new THREE.Color(0x000000));
		}
	}

	particleSystem = new THREE.ParticleSystem(particles, mat);
	particleSystem.sortParticles = true;

	scene.add(particleSystem);
}

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 200;

	scene = new THREE.Scene();

	controls = new THREE.TrackballControls(camera, renderer.domElement);
	clock = new THREE.Clock();

	camera.position.z = -1000;

	controls.movementSpeed = 2500;
	controls.rollSpeed = Math.PI / 6;
	controls.autoForward = false;
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