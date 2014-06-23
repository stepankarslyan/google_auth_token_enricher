var zmq = require("zmq");

var subscriber = zmq.socket("sub");
subscriber.connect("tcp://localhost:6003");
subscriber.subscribe("");
console.log("Subscriber connecting to the localhost 6003...");

subscriber.on("message", function(data) {
  console.log("Data from publisher: " + data.toString());
  
});
