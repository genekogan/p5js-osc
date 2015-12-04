var x;
var y;

function setup() {
  createCanvas(1400, 900);
	setupOsc();
 	x = 50;
 	y = 50;
}

function draw() {
  	background(0);
  	stroke(0); 
	  fill(255);
	  rect(x,y,75,75);
}

function receiveOsc(address, value) {
	if (address == "/test") {
		x = value[0];
		y = value[1];
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
	  	var address = msg[0];
	  	var value = [];
	  	value.push(msg[1]);
	  	value.push(msg[2]);	
		//console.log(address);
		//console.log(value);
		receiveOsc(address, value);
	});
}