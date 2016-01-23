var joints = []

function setup() {
	createCanvas(800, 800);
	setupOsc(6448, 3334);
}

function draw() {
	background(0, 5);
	stroke(255, 100);
	for (var i=0; i<joints.length; i++) {
		for (var j=i+1; j<joints.length; j++) {
			var x1 = joints[i].x + random(-10, 10);
			var y1 = joints[i].y + random(-10, 10);
			var x2 = joints[j].x + random(-10, 10);
			var y2 = joints[j].y + random(-10, 10);
			// var x1 = joints[i].x + map(noise(frameCount*0.039, 15, i), 0, 1, -20, 20);
			// var y1 = joints[i].y + map(noise(frameCount*0.041, 25, i), 0, 1, -20, 20);
			// var x2 = joints[j].x + map(noise(frameCount*0.035, 35, j), 0, 1, -20, 20);
			// var y2 = joints[j].y + map(noise(frameCount*0.029, 45, j), 0, 1, -20, 20);
			line(x1, y1, x2, y2);
		}
	}
}

function receiveOsc(address, value) {
	if (address = '/wek/inputs') {
		joints = [];
		for (var i=0; i<value.length; i+=2) {
			joints.push({x: width*value[2*i], y: height*value[2*i+1]});
		}
	}
	console.log("received OSC: " + address + ", " + value);
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: false });
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