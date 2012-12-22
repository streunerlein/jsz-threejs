

navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var App = {};
var faces = [];
App.video = document.createElement('video');
App.backCanvas = document.createElement('canvas');
App.canvas = document.createElement("canvas");
App.context = App.canvas.getContext('2d');

navigator.getUserMedia_({
	audio: false,
	video: true
}, startface, function() {});
App.video.load();

var sg = new THREE.Geometry();
sg.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 0, 0)));

App.drawToCanvas = function() {
	var video = App.video,
		ctx = App.context,
		backCtx = App.backContext,
		m = 4,
		w = 4,
		i,
		comp;
	
	ctx.drawImage(video, 0, 0, App.canvas.width, App.canvas.height);
	
	backCtx.drawImage(video, 0, 0, App.backCanvas.width, App.backCanvas.height);
	
	comp = ccv.detect_objects(App.ccv = App.ccv || {
		canvas: App.backCanvas,
		cascade: cascade,
		interval: 4,
		min_neighbors: 1
	});
	
	if (comp.length) {
		App.comp = comp;
	}

	for (i = 0; i < faces.length; i++) {
		scene.remove(faces[i]);
	}
	
	for (i = 0; i < App.comp.length; i++) {
		var c = document.createElement("canvas");
		c.width = (App.comp[i].width + w) * m; 
		c.height = (App.comp[i].height + w) * m;
		var smallctx = c.getContext('2d');
		var img = ctx.getImageData((App.comp[i].x - w / 2) * m, (App.comp[i].y - w / 2) * m, (App.comp[i].width + w) * m, (App.comp[i].height + w) * m);
		smallctx.putImageData(img, 0, 0);

		var text = new THREE.Texture(c);
		var g = new THREE.Geometry();
		g.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 0, 0)));

		var mesh = new THREE.ParticleSystem(
			g,
			new THREE.ParticleBasicMaterial({
				color: 0xffffff,
				map: text,
				size:30,
				transparent: true
		}));
		mesh.sortParticles = true;
		mesh.position.y = 810;
		mesh.position.x = 5 + (i * 120);
		mesh.position.z -= 2;

		text.needsUpdate = true;

		var smesh = new THREE.ParticleSystem(
			sg,
			new THREE.ParticleBasicMaterial({
				color: 0xffffff,
				map: THREE.ImageUtils.loadTexture('textures/santababy.png'),
				blending: THREE.AdditiveBlending,
				transparent:true,
				size:1200
		}));
		smesh.position.y = 800;
		smesh.position.x = i * 120;

		scene.add(mesh);
		scene.add(smesh);

		faces.push(mesh);
		faces.push(smesh);
	}
};


function startface(stream) {
	App.video.addEventListener('canplay', function() {
		App.video.removeEventListener('canplay');
		setTimeout(function() {
			App.video.play();
			App.canvas.width = App.video.videoWidth;
			App.canvas.height = App.video.videoHeight;
			App.backCanvas.width = App.video.videoWidth / 4;
			App.backCanvas.height = App.video.videoHeight / 4;
			App.backContext = App.backCanvas.getContext('2d');
		
			var w = 1280 / 4 * 0.8,
				h = 720 / 4 * 0.8;
		
			App.comp = [{
				x: (App.video.videoWidth / 4 - w) / 2,
				y: (App.video.videoHeight / 4 - h) / 2,
				width: w, 
				height: h
			}];
		
			App.drawToCanvas();

			renderhooks.push(App.drawToCanvas);
		}, 500);
	}, true);
	
	var domURL = window.URL || window.webkitURL;
	App.video.src = domURL ? domURL.createObjectURL(stream) : stream;
}