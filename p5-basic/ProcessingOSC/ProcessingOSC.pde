/**
 this Processing sketch will send its mouse
 position over OSC to the p5.js sketch in the folder "p5-basic".
 you need the library OscP5 to run it.
 */
 
import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

void setup() {
  size(500, 500);
  oscP5 = new OscP5(this, 8000);
  myRemoteLocation = new NetAddress("127.0.0.1", 12000);
}


void draw() {
  background(0);
  fill(255);
  ellipse(mouseX, mouseY, 100, 100);
  fill(0);
  text("I'm Processing", mouseX-40, mouseY);
  
  // send mouse position over OSC
  OscMessage myMessage = new OscMessage("/test");
  myMessage.add(mouseX);
  myMessage.add(mouseY);
  oscP5.send(myMessage, myRemoteLocation);
}

