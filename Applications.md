### osc in p5.js

adapted from [osc-web](https://github.com/automata/osc-web).

#### setup

1) install [node](https://nodejs.org/)

2)

	$ git https://github.com/genekogan/p5js-osc
	$ cd p5js-osc/
	$ npm install

3)

    $ node bridge.js

This command runs the file in this repo called "bridge.js", it runs on the server. Is is a javascript file that creates a connection using <a href="http://socket.io/">socket.io.</a> This file creates a listener on the server, which is where the computer is listening for packets sent using UDP. Any computer can support sending and receiving network packets, eg. it can request info, by sending an http request (UDP).  

(What is socket.io? Socket is one of the most common node modules which facilitates communication between the client and the server. bridge.js converts into socket which then passes it to OSC)  

We need to use something like OSC because p5js (unlike processing) does not have access to the drivers in your computer. This is for good reason, we wouldn't want javascript on a server to be able to access your drivers eh? So if you want to use something like p5 and the kinect, you need to send the data from the device, which needs access to your computer's drivers, and then send it to p5js over OSC (which is actually via UDP). So your computer is being both the server (node) and the client (p5).  

If you then open any of the index.html pages in the folders of the repo. You may need to <a href="http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/">start a local server</a> if you start using video or images etc. in your sketch.  

When you open index.html from a sketch in a browser, it connects to bridge.js.  

Note: if you try to reload the index.html page in the browser. You'll notice you get an error and node will stop running. When you start node, the server communicates with your application over a particular port. It only allows one application to connect over a single port and it won't let anything else connect to it. So when you reload, you are not actually closing the connection, and node thinks you are another application trying to connect and will crash. So for now, you have to restart node everytime you refresh your browser (do this in the terminal where you are running bridge CRL-c to quit and then relaunch using as before:  

	$node bridge.js

4) send OSC to p5 via port 3333. send OSC from p5 via port 3334  


###examples

 - basic (done)
 - in: kinect
 - in: leap-motion
 - in: faceosc
 - in: midi device?
 - out: ableton?

####Example sending OSC data from Processing and receiving in p5js:
*In Processing:*  
- Install the osvP5 library from the import library menu in Processing.
- Take a look at the simple Processing example called oscP5sendReceive.
- Modify it to send the mouse coordinates over OSC everytime the mouse is pressed.
*Getting this talking to p5:*  
- To get this running. Run the Processing sketch. Then, make sure you are running bridge.js in your terminal (always launch this on the server before you launch the p5 sketch). Then open index.html (from the p5-app folder) in your browser.
- In your browser javascript console, you should then see the mouse coordinates print out when you click in the Processing sketch.
- Note: The order you start everything here is really important. If you get an error. Close the p5 sketch in the browser. Kill node with CTRL c. Then launch the server (bridge.js) again and then open the p5 sketch again.
- A quick way to do this in chrome is using the shortcut CMD + SHIFT + T (reopens the last tab, this helps to relaunch your p5)
- In p5 you can animate something with these mouse coordinates.

####Example sending OSC data from OpenFrameworks Face tracker and receiving in p5js:
*FaceOSC*  
- (SORRY at the moment facetracker is only released for mac)
- Javascript is slow for facetracking so we can use OF facetracker to do the face work and send the data to javascript over OSC.
- Download facetracker in OF from <a href="https://github.com/kylemcdonald/ofxFaceTracker/releases">here. Get v 1.1 a the bottom of the page.</a>
- See the documentation of this in the repo.
- Fun things to try with this. Draw a face on a piece of paper, can facetracker recognize it?
*Facetracker options*
- Pose and gesture refers to pose and gesture of the face. Direction of the face, size of eyes, width of mouth etc.
- If you have raw on, you are sending raw data (the coordinates of the facial mesh) and it sends 1032 numbers 30 times a second. A lot of data! Note, if you are not using this it is a waste to send all this data unless you need it.
- Syphon sends the image (but keep this off for now).
- Now start index.html of p5-faceOsc. You should see the wireframe of your face in your browser.   
*FaceOSC-flocking*  
- try this, this is an example from Dan Shiffman to see more of what's possible.  
- See inside this example for more info on the data that faceOSC provides.  

####Example using the Kinect
- Download the OSC kinect 1 application made by jpbellona. Get the zip from the [repo here.](https://github.com/jpbellona/simpleKinect)
- (If you have a windows machine you can use a kinect 2 and use [this repo.](https://github.com/microcosm/ofxKinectV2-OSC))
- Find the Processing sketch called simpleKinect in this repo.  
- This sketch sends kinect data to OSC. We can then use this in p5.  
- Careful, this still has some bugs.  

####Example using Ableton
- To get this working you need to download and install [Max for Live (M4L)](https://www.ableton.com/en/live/max-for-live/). M4L is a somewhat truncated version of MaxMSP.  Ableton doesn't support OSC directly, but it does support M4L devices which can convert our OSC to midi so that ableton can receive data from our p5 app.
- The example in this repo will play a note each time our ball in p5 hits a wall.
- So you can create a p5 app and control ableton from it.

*These are very rough notes from the p5 OSC workshop held at ITP in January 2016.  Ableton example updated May 2021 by Billy Bennett*
