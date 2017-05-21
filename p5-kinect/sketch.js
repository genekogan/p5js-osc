var joints = []

function setup() {
	createCanvas(640, 480);
	setupOsc(6448, 3334);
}

function draw() {
	background(0, 7);
	stroke(255, 100);
	for (var i=0; i<joints.length; i++) {
		for (var j=i+1; j<joints.length; j++) {
			var x1 = joints[i].x + random(-15, 15);
			var y1 = joints[i].y + random(-15, 15);
			var x2 = joints[j].x + random(-15, 15);
			var y2 = joints[j].y + random(-15, 15);
			line(x1, y1, x2, y2);
		}
	}
}

function receiveOsc(address, value) {
	if (address == '/kinect/screen') {
		joints = [];
		for (var i=0; i<value.length; i+=2) {
			joints.push({x: value[2*i], y: value[2*i+1]});
		}
	}
	if (address == '/kinect/realworld') {
		// these are the real world coordinates (3d)
	}
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}