var osc = require('node-osc');

oscClient = new osc.Client("localhost", 6969);
msg = new osc.Message("/test")
msg.append(55)
msg.append(100)
oscClient.send(msg, () => oscClient.kill() )