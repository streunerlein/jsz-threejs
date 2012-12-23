
var renderer, scene, camera, carCamera = null, controls, car = null, ground, clock, snowCount = 0, snowParticleSystem = null, clockdelta;
var CAMERACONTROL = true;
var renderhooks = [];
var vehicle = null;

var vehicleControls = {
	moveForward: false,
	moveBackward: false,
	moveLeft: false,
	moveRight: false
};

init();
animate();

addLight();

addGround();

addSnow();

addSanta();

addText();

function addLight() {
	var light;

	light = new THREE.PointLight();
	light.position.y = 500;

	scene.add(light);
}

function addGround() {
	var material = new THREE.MeshPhongMaterial({color: 0xffffff, map: THREE.ImageUtils.loadTexture("textures/snow-1.png")});
	var geometry = new THREE.PlaneGeometry(100, 100);
	var mesh = new THREE.Mesh(geometry, material);

	mesh.rotation.x -= Math.PI / 2;
	mesh.position.set(0, 0, 0);
	mesh.scale.set(100, 100, 100);

	mesh.castShadow = false;
	mesh.receiveShadow = true;

	scene.add(mesh);
	ground = mesh;
	material.needsUpdate = true;
}

function addSnow() {
	var particleCount = 6000,
		particles = new THREE.Geometry(),
		mat = new THREE.ParticleBasicMaterial({
			color:0xffffff,
			size: 20,
			map: THREE.ImageUtils.loadTexture('textures/particle.png'),
			blending: THREE.AdditiveBlending,
			transparent: true
		});

	for (var i = 0; i < particleCount; i++) {
		var x = Math.random() * 4000 - 2000,
			y = Math.random() * 4000 - 2000,
			z = Math.random() * 4000 - 2000;
		var particle = new THREE.Vertex(new THREE.Vector3(x, y, z));
		particles.vertices.push(particle);

		particle.velocity = new THREE.Vector3(
		  0,              // x
		  -Math.random(), // y: random vel
		  0);             // z
	}

	var particleSystem = new THREE.ParticleSystem(particles, mat);
	particleSystem.sortParticles = true;

	scene.add(particleSystem);

	snowParticleSystem = particleSystem;
	snowCount = particleCount;
}

function updateSnow() {
	if (snowParticleSystem !== null) {
		for (var i = 0; i < snowCount; i++) {
			var particle = snowParticleSystem.geometry.vertices[i];

			if (particle.y < -200) {
				particle.y += 4000;
				particle.velocity.y = 0;
			}

			particle.velocity.y -= Math.random() * 0.05;

			var pos = new THREE.Vector3(particle.x, particle.y, particle.z);

			pos.addSelf(particle.velocity);

			particle.x = pos.x;
			particle.y = pos.y;
			particle.z = pos.z;
		}

		snowParticleSystem.geometry.__dirtyVertices = true;
	}
}

function addSanta() {
	vehicle = new THREE.Object3D();
	// add Santa
	var l = new THREE.JSONLoader();
	l.load('models/js/santa.js',function(geometry) {
			var material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				map: THREE.ImageUtils.loadTexture('textures/santa.jpg')
			});
			var mesh = new THREE.Mesh(geometry, material);
			vehicle.add(mesh);
			material.needsUpdate = true;
		}
	);

	// add Sleigh
	var l = new THREE.JSONLoader();
	l.load('models/js/sleigh.js',function(geometry) {
			var material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				map: THREE.ImageUtils.loadTexture('textures/sleigh.jpg')
			});
			var mesh = new THREE.Mesh(geometry, material);
			vehicle.add(mesh);
			material.needsUpdate = true;
		}
	);

	// add bag
	var l = new THREE.JSONLoader();
	l.load('models/js/bag.js',function(geometry) {
			var material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				map: THREE.ImageUtils.loadTexture('textures/bag.jpg')
			});
			var mesh = new THREE.Mesh(geometry, material);
			vehicle.add(mesh);
			material.needsUpdate = true;
		}
	);

	// add deers
	var l = new THREE.JSONLoader();
	l.load('models/js/deer1.js',function(geometry) {
			var material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				map: THREE.ImageUtils.loadTexture('textures/deer.jpg')
			});
			var mesh = new THREE.Mesh(geometry, material);
			vehicle.add(mesh);
			material.needsUpdate = true;
		}
	);
	var l = new THREE.JSONLoader();
	l.load('models/js/deer2.js',function(geometry) {
			var material = new THREE.MeshPhongMaterial({
				color: 0xffffff,
				map: THREE.ImageUtils.loadTexture('textures/deer.jpg')
			});
			var mesh = new THREE.Mesh(geometry, material);
			vehicle.add(mesh);
			material.needsUpdate = true;
		}
	);
	var root = new THREE.Object3D();
	root.add(vehicle);
	scene.add(root);

	root.position.z = -5000;

	var lookpos = scene.position.clone();
	new TWEEN.Tween(root.position)
		.to({x:0,y:0,z:0}, 2000)
		.easing(TWEEN.Easing.Elastic.InOut)
		.delay(1000)
		.onComplete(function() {
			new TWEEN.Tween(camera.position)
				.to({x: camera.position.x + 300, y: camera.position.y + 200, z:camera.position.z + 100}, 2000)
				.easing(TWEEN.Easing.Cubic.InOut)
				.onUpdate(function() {
					lookpos.y += 2;
					camera.lookAt(lookpos);
				})
				.start();
		})
		.start();

	car = new THREE.Car();

	vehicle.rotation.y = -Math.PI / 2;
	car.root = root;


	function onKeyDown ( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/	vehicleControls.moveForward = true; break;
			case 87: /*W*/ 	vehicleControls.moveForward = true; break;

			case 40: /*down*/vehicleControls.moveBackward = true; break;
			case 83: /*S*/ 	 vehicleControls.moveBackward = true; break;

			case 37: /*left*/vehicleControls.moveLeft = true; break;
			case 65: /*A*/   vehicleControls.moveLeft = true; break;

			case 39: /*right*/vehicleControls.moveRight = true; break;
			case 68: /*D*/    vehicleControls.moveRight = true; break;

		}

	};


	function onKeyUp ( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/vehicleControls.moveForward = false; break;
			case 87: /*W*/ vehicleControls.moveForward = false; break;

			case 40: /*down*/vehicleControls.moveBackward = false; break;
			case 83: /*S*/ 	 vehicleControls.moveBackward = false; break;

			case 37: /*left*/vehicleControls.moveLeft = false; break;
			case 65: /*A*/ 	 vehicleControls.moveLeft = false; break;

			case 39: /*right*/vehicleControls.moveRight = false; break;
			case 68: /*D*/ 	  vehicleControls.moveRight = false; break;

		}

	};

	document.onkeydown = onKeyDown;
	document.onkeyup = onKeyUp;

	car.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

	root.add(car.camera);

	car.camera.position.z = -2000;
	car.camera.rotation.y = Math.PI;
	car.camera.position.y = 900;
	car.camera.rotation.x = Math.PI / 6;
}

function addText() {
	var text, geo, mat;

	// add kthxbye
	geo = new THREE.TextGeometry("#kthxbye", {
		size: 125,
		height: 20,
		curveSegments: 6,
		font: "helvetiker",
		weight: "bold"
	});
	mat = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		specular: 0xffffff,
		opacity: 0,
		transparent:true
	});

	text = new THREE.Mesh(geo, mat);
	text.position.y = 650;
	text.position.x = -1000;

	var kthxbye = text;
	scene.add(text);

	new TWEEN.Tween({o: 0})
		.to({o: 1000}, 1000)
		.easing(TWEEN.Easing.Cubic.InOut)
		.delay(5000)
		.onUpdate(function() {
			kthxbye.material.opacity = this.o / 1000;
		})
		.start();

	// add merry christmas
	geo = new THREE.TextGeometry("Merry Christmas", {
		size: 125,
		height: 20,
		curveSegments: 6,
		font: "helvetiker",
		weight: "bold"
	});
	mat = new THREE.MeshPhongMaterial({
		color: 0xffff00,
		specular: 0xffffff,
		opacity: 0,
		transparent:true
	});

	text = new THREE.Mesh(geo, mat);

	text.position.y = 500;
	text.position.x = -1000;
	var mc = text;

	scene.add(text);

	new TWEEN.Tween({o: 0})
		.to({o: 1000}, 1000)
		.easing(TWEEN.Easing.Cubic.InOut)
		.delay(6000)
		.onUpdate(function() {
			mc.material.opacity = this.o / 1000;
		})
		.start();

	// add merry christmas
	geo = new THREE.TextGeometry("JSZurich", {
		size: 125,
		height: 20,
		curveSegments: 6,
		font: "helvetiker",
		weight: "bold"
	});
	mat = new THREE.MeshPhongMaterial({
		color: 0xff0000,
		specular: 0xffffff,
		opacity: 0,
		transparent:true
	});

	text = new THREE.Mesh(geo, mat);
	text.position.y = 350;
	text.position.x = -1000;

	scene.add(text);

	var jsz = text;

	new TWEEN.Tween({o: 0})
		.to({o: 1000}, 1000)
		.easing(TWEEN.Easing.Cubic.InOut)
		.delay(6000)
		.onUpdate(function() {
			jsz.material.opacity = this.o / 1000;
		})
		.start();

	var light = new THREE.PointLight();

	light.position.y = 500;
	light.position.z = 1000;

	scene.add(light);
}

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 200;
	camera.position.x -= 200;
	camera.position.z = 900;

	scene = new THREE.Scene();

	controls = new THREE.FlyControls(camera, renderer.domElement);
	clock = new THREE.Clock();

	controls.movementSpeed = 2500;
	controls.rollSpeed = Math.PI / 6;
	controls.autoForward = false;
	controls.dragToLook = true;

	scene.fog = new THREE.Fog( 0x000000, 1500, 5000 );
	scene.fog.color.setHSV( 0.51, 0.6, 0.025 );

	camera.lookAt(scene.position);
}


function animate() {
	var activeCam = camera;
	clockdelta = clock.getDelta();
	requestAnimationFrame(animate);

	TWEEN.update();

	if (CAMERACONTROL) {
	}
	else {
		if (car !== null) {
			activeCam = car.camera;
			car.updateCarModel(clockdelta, vehicleControls);
		}
	}
	controls.update(clockdelta);
	updateSnow();

	for (var i = 0; i < renderhooks.length; i++) {
		renderhooks[i]();
	}

	if (camera.position.y < 50) {
		camera.position.y = 50;
	}

	renderer.render(scene, activeCam);
}