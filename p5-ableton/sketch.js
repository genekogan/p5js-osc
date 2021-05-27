// we need a handle to the socket to send our osc values
var socket;
var isConnected;

// set variables for ball location and speed
var x, y, xSpeed, ySpeed;

function setup() {
	createCanvas(800, 600);
	setupOsc(8000, 12000);

	x = random(width);
	y = random(height);

	xSpeed = 5;
	ySpeed = 6;

}

function draw() {
	background(0);

	// ball is an ellipse
	ellipse(x, y, 100, 100);

  // move the ball location
	x+=xSpeed;
	y+=ySpeed;

	// check if the ball hits a wall and send a message if so
	if (x > width || x < 0) {

		xSpeed *= -1
		sendOsc('message', 1);

	} else if (y > height || y < 0) {

		ySpeed *= -1
		sendOsc('message', 1);

	}

}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
}

function sendOsc(address, value) {
	if (isConnected) {
		socket.emit('message', [address, value]);
	}
}

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});
	socket.on('connect', function() {
		isConnected = true;
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
