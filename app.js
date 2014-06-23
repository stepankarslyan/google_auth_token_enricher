var zmq = require("zmq");

var subscriber = zmq.socket("sub");
subscriber.connect("tcp://localhost:6003");
subscriber.subscribe("");
console.log("Subscriber connecting to the localhost 6003...");

var requester = zmq.socket("asyncreq");
requester.connect("tcp://localhost:6005");
console.log("Requester connecting to the localhost 6005...");

subscriber.on("message", function(data) {
  var message = data.toString();
  console.log("Data from publisher: " + message);
  requester.send(message, function(response) {
    console.log("data from responder: " + response.toString());
  });
});
