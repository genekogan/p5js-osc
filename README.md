### osc in p5.js

adapted from [osc-web](https://github.com/automata/osc-web).

#### setup

Install [node](https://nodejs.org/)

Clone this repo and run npm to get required libraries.

	$ git clone https://github.com/genekogan/p5js-osc
	$ cd p5js-osc/
	$ npm install

Start node.

    $ node bridge.js

Then run any of the sketches in a browser or from the editor. Can also be run locally (i.e. just open index.html).

Inside each sketch, when you run `setupOSC` you give it the input and output ports (default 3333, 3334).

### Applications

Thanks [Tega Brain](https://github.com/tegacodes) for extended [notes on the included applications](https://github.com/genekogan/p5js-osc/blob/master/Applications.md).

There is a [demo video](https://vimeo.com/157024760) of the included examples.

Examples:
 - Processing (needs [oscP5](www.sojamo.de/oscP5))
 - Ableton Live (needs [M4L (Max For Live)](https://www.ableton.com/en/live/max-for-live/) and [KinectOSC](https://github.com/genekogan/KinectOSC/releases))
 - FaceTracker (needs [FaseOSC](https://github.com/kylemcdonald/ofxFaceTracker/releases))
 - Kinect (needs [KinectOSC](https://github.com/genekogan/KinectOSC/releases))

Low-hanging fruits.
 - [TouchOSC](http://hexler.net/software/touchosc) to control p5 from a phone/tablet

### p5.js - arduino bridge

[@lorenzoromagnoli](https://github.com/lorenzoromagnoli) made this into a [standalone application](https://github.com/lorenzoromagnoli/p5js-osc) using [electron](https://electron.atom.io/) which bridges p5.js to arduino over OSC.
