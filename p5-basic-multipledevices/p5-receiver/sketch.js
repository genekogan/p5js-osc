const BRIDGE_IP = 127.0.0.1;
const OSC_PORT_IN = 12000;
const OSC_PORT_OUT = 3334;
const OSC_SENDER_IP = 192.168.2.82; 
const OSC_RECEIVER_IP = 192.168.1.66;


var x, y;

function setup() {
	createCanvas(500, 500);
	setupOsc(OSC_PORT_IN, OSC_PORT_OUT);
}

function draw() {
	background(0, 0, 255);
	fill(0, 255, 0);
	ellipse(x, y, 100, 100);
	fill(0);
	text("I'm p5.js", x-25, y);
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);

	if (address == '/test') {
		x = value[0];
		y = value[1];
	}
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect(`http://${BRIDGE_IP}:${BRIDGE_PORT}`, { port: BRIDGE_PORT , rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: OSC_PORT_IN ,  host: OSC_SENDER_IP },
			client: { port: OSC_PORT_OUT , host: OSC_RECEIVER_IP  }
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
