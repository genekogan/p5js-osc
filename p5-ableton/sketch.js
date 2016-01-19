// we need a handle to the socket to send our osc values
var socket;
var iscon;
function setup() {
	createCanvas(100, 100);
	iscon = false;
	setupOsc(8000, 9000);
}

function draw() {
	background(0, 0, 200);
	if (iscon && frameCount > 30) {
		console.log("go "+float(mouseX));
		socket.emit('message', ['/live/tempo', mouseX]);
	}
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
}

function sendOsc(address, value) {
	socket.emit('message', [address, value]);
}

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: false });
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
	iscon = true;
}