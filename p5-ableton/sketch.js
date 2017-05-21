// we need a handle to the socket to send our osc values
var socket;
var isConnected;

// make an array of Balls 
var balls = [];

function setup() {
	createCanvas(800, 600);
	setupOsc(8000, 12000);
	
	// make 4 new Balls
	for (var i=0; i<4; i++) {
		balls.push(new Ball());
	}
}

function draw() {
	background(0);

	// check every combination of two Balls.
	for (var i=0; i<balls.length; i++) {
		for (var j=i+1; j<balls.length; j++) {
			// check if they are hitting each other
			// if they are, bounce them
			if (checkIfBouncing(balls[i], balls[j])) {
				// get the angle between the balls when they are intersecting
		        var ang = atan2(balls[i].position.y - balls[j].position.y, balls[i].position.x - balls[j].position.x);
				// then set their velocities according to the angle (normalized to their speed)
				// not really how balls bounce, but keep it simple
				balls[i].velocity = {x: balls[i].getSpeed() * cos(ang), y: balls[i].getSpeed() * sin(ang) };
				balls[j].velocity = {x: balls[j].getSpeed() * cos(ang+PI), y: balls[j].getSpeed() * sin(ang+PI) };
	      }
	    }
    }

	// update and draw Balls
	for (var i=0; i<balls.length; i++) {
		balls[i].update();
	    balls[i].draw();
	}
	
	// get each of the 4 Balls x and y coordinates, and normalize them between 0 and 1
	// this gives you 8 variables between 0 and 1
	var v1 = balls[0].position.x / width;
	var v2 = balls[0].position.y / height;
	var v3 = balls[1].position.x / width;
	var v4 = balls[1].position.y / height;
	var v5 = balls[2].position.x / width;
	var v6 = balls[2].position.y / height;
	var v7 = balls[3].position.x / width;
	var v8 = balls[3].position.y / height;
	
	// in my example, i'm mapping v1 to global tempo, so going to remap it to something more reasonable (so it doesn't go 1000bpm)
	v1 = map(v2, 0, 1, 0.06, 0.2);
	
	// send these over OSC to AbletonOSC after you've selected 8 parameters to modify
	if (isConnected) {
		socket.emit('message', ['/wek/outputs', v1, v2, v3, v4, v5, v6, v7, v8]);
	}
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
}

function sendOsc(address, value) {
	socket.emit('message', [address, value]);
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


//// define Ball class

function Ball() {
  this.position = {x:random(width), y:random(height)};
  this.velocity = {x:random(-3, 3), y:random(-3, 3)};
  this.radius = random(20, 70);
  
  this.update = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.x > width - this.radius) {
      this.velocity.x = -abs(this.velocity.x);
    }
    else if (this.position.x < this.radius) {
      this.velocity.x = abs(this.velocity.x);
    }
    if (this.position.y > height - this.radius) {
      this.velocity.y = -abs(this.velocity.y);
    }
    else if (this.position.y < this.radius) {
      this.velocity.y = abs(this.velocity.y);
    }
  }
    
  this.getSpeed = function() {
    return sqrt(pow(this.velocity.x, 2) + pow(this.velocity.y, 2));
  }

  this.draw = function() {
    fill(255);
    ellipse(this.position.x, this.position.y, 2 * this.radius, 2 * this.radius);
  }
}

function checkIfBouncing(a, b) {
  var d = dist(a.position.x, a.position.y, b.position.x, b.position.y);
  if (d < a.radius + b.radius) {
    return true;
  } else {
    return false;
  }
}
