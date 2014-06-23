var zmq = require("zmq");
var subscriber = zmq.socket("sub");
subscriber.connect("tcp://localhost:1112");
subscriber.subscribe("");
console.log("Connecting to the 1112...");

subscriber.on("message" , function(resurce) {
  console.log("publisher sends: " + resurce.toString())
});
