var zmq = require("zmq");
console.log("running server!");
var responder = zmq.socket("asyncrep");
responder.bind("tcp://*:6005");
responder.on("message", function(message, response) {
  console.log("Data from requester: " + message);
  response.send(JSON.stringify({ID: "hello you"}));
});
process.on("SIGINT", function() {
  responder.close();
});
