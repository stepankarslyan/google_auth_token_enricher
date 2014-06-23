var zmq = require("zmq");

var subscriber = zmq.socket("sub");
subscriber.connect("tcp://localhost:6003");
subscriber.subscribe("");
console.log("Subscriber connecting to the localhost 6003...");

var requester = zmq.socket("asyncreq");
requester.connect("tcp://localhost:6005");
console.log("Requester connecting to the localhost 6005...");

var publisher = zmq.socket("pub");
publisher.bind("tcp://*:1112");

subscriber.on("message", function(data) {
  console.log("Data from publisher: " + data.toString());
  var token = JSON.parse(data);
  
  requester.send(token, function(response) {
    console.log("data from responder: " + response.toString());
    var tokenId = JSON.parse(response);
    var userDetail = {
      userToken: token,
      userId: tokenId
    };
    
    publisher.send(JSON.stringify(userDetail));
  });
});
