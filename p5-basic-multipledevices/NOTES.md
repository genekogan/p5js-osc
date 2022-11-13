# Connect multiple devices through P5-OSC within the same network
## Example 1: P5-receiver & Processing-sender
This is a W.I.P: still in the learning loop :) 


### draft notes
How I imagine it should "work": 

    forward from processing to { OSC_SENDER_IP }:8000
    { OSC_SENDER_IP }:{ 8000 } -> { OSC_SENDER_IP }:{ OSC_PORT_OUT }
    { BRIDGE_IP }:{ OSC_PORT_OUT } -> { BRIDGE_IP }:{ OSC_PORT_IN }
    { BRIDGE_IP }:{ OSC_PORT_IN } ->  { OSC_RECEIVER_IP }:{ OSC_PORT_IN }
    forward OSC_RECEIVER_IP <- LOCALHOST 
     { LOCALHOST }:8080 -> app

I have no clear understanding on connecting OSC_SENDER_IP, BRIDGE_HOST_IP, OSC_RECEIVER_IP within the same network.

### steps
0. **/bridge**: Run `node bridge.js`  will run on port 8081. 

1. **/P5-receiver** :
- Update PORTS in `sketh.js`.
- Update  `<script src="http://{ BRIDGE_HOST_IP }:8081/socket.io/socket.io.js"></script>`
  - PROBLEM: Doesn't work. Can not acces `http:// { IP } : { PORT }`, it is not exposed to other devices within the same network.
    - QUESTION 1: Using ngrok to expose it? // Docker container?
    - QUESTION 2: Should add layer of IPs?
         forward from processing to { OSC_SENDER_IP }:{ PROCESSING_PORT }
        { SENDER_HOST_IP }:{ PROCESSING_PORT } -> { SENDER_HOST_IP }:{ OSC_PORT_OUT }
        { BRIDGE_IP }:{ OSC_PORT_OUT } -> { BRIDGE_IP }:{ OSC_PORT_IN }

        { forward BRIDGE_IP<-> ngrok }

        { BRIDGE_IP }:{ OSC_PORT_IN } ->  { OSC_RECEIVER_IP }:{ OSC_PORT_IN }
        forward OSC_RECEIVER_IP <- LOCALHOST 
        { LOCALHOST }:8080 -> app
 


1. **/Processing-sender** :Update PORTS

       
    
