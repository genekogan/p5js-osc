/**
 This Processing sketch will send its mouse position 
 over OSC to the p5.js sketch in the folder "p5-basic".
 you need the library OscP5 to run it.
 
 It will also receive the mouse position from the p5.js sketch 
 and display it on the screen.
 */
 
import oscP5.*;
import netP5.*;
int x,y;

OscP5 oscP5;
NetAddress myRemoteLocation;

void setup() {
  size(500, 500);
  // Start OSC and listen for messages on port 3334
  oscP5 = new OscP5(this, 3334);
  // We'll send OSC messages on port 3333
  myRemoteLocation = new NetAddress("127.0.0.1", 3333);
}


void draw() {

  background(0);
  fill(255);
  ellipse(x, y, 100, 100);
  fill(0);
  text("I'm Processing", x-40, y);
  
  // send mouse position over OSC
  OscMessage myMessage = new OscMessage("/test");
  myMessage.add(mouseX);
  myMessage.add(mouseY);
  oscP5.send(myMessage, myRemoteLocation);
}

// run whenever an OSC message is received
void oscEvent(OscMessage theOscMessage) {
  
  // print the address  of the received message
  print("### received an osc message.");
  print(" address: "+theOscMessage.addrPattern());
  //print(" typetag: "+theOscMessage.typetag());

  // check if incoming message has the address you're looking for
  if(theOscMessage.checkAddrPattern("/mousePos")==true){
    // parse the x and y mouse coordinates from the message
    x = theOscMessage.get(0).intValue();
    y = theOscMessage.get(1).intValue();
    print(" x: "+x + " y: "+y);
  }

  println();
  
}

