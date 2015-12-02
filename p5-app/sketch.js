var x;

function setup() {
  	createCanvas(500, 400);
	setupOsc();
 	x = 50;
}

function draw() {
  	background(0);
  	stroke(0); 
	fill(255);
	rect(x,50,75,75);
}

function receiveOsc(address, value) {
	if (address == "/rate") {
		x = value;
	}
}

function setupOsc() {
	var socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: false});
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: 3333, host: '127.0.0.1'},
			client: { port: 3334, host: '127.0.0.1'}
		});
	});
	socket.on('message', function(msg) {
		var address = msg[2][0];
		var value = msg[2][1];
		receiveOsc(address, value);
	});
}