/*
This sketch receives mouse positions (i.e. [x,y] coordinates) 
over OSC and displays it to screen
It also sends out the current mouse position over OSC

e.g. This can be used along with Processing sketch 'ProcessingOSC'
to test OSC send and receive capabilities

The sketch needs the osc.js script in the same folder and included in index.html

Before running, you need to start node server by executing
node bridge.js
in the folder where 'bridge.js' is (should be one folder up)

If you get the error 'Uncaught ReferenceError: io is not defined' on running this sketch,
it means the node server isn't running or may have crashed.
*/

var connect_to_this_ip = '127.0.0.1'
var incomingPort = 3333;
var outgoingPort = 3334;

var x = 250, y = 250;

function setup() {
	createCanvas(500, 500);
	setupOsc(incomingPort, outgoingPort);
}

function draw() {
	background(0);
	fill(255);
	ellipse(x, y, 100, 100);
	fill(0);
	text("I'm p5.js", x-25, y);
	
	// Send mouse position over OSC
	sendOsc('/mousePos',[mouseX,mouseY]);
}

// This is run every time an OSC message is received
function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
	
  // Change the code below depending on the form of the incoming OSC message	
	if (address == '/test') {
		x = value[0];
		y = value[1];
	}
}
