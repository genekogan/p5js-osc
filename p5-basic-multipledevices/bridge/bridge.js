var osc = require('node-osc');
var io = require('socket.io')(8081);


var oscServer;
var port = 6969
var sockets = new Map()

oscServer = new osc.Server(port, "localhost");
oscServer.on('message', function(msg) {
	console.log("message " + msg)
	console.log(sockets)
	sockets.forEach((v, k) => {
		console.log("emitting " + msg + " to " + k)
		v.emit("message", msg)
	});
});


io.sockets.on('connection', function (socket) {
	sockets.set(socket.id, socket)
	console.log(socket.id + " connected, say hello")
	socket.emit("connected", 1);
 	socket.on("message", function (obj) {
		console.log("message " + obj)
  	});
	socket.on('disconnect', function(socket){
		sockets.delete(socket.id)
  	});
});
