var argv = require('optimist')
    .default({ 
      subConn: "tcp://localhost:6003",
      bind: "tcp://*:1112",
      reqConn: "tcp://localhost:6005" 
    })
    .argv;

var zmq = require("zmq");

var subscriber = zmq.socket("sub");
subscriber.connect(argv.subConn);
subscriber.subscribe("");
console.log("Subscriber connecting to the " + argv.subConn);

var requester = zmq.socket("asyncreq");
requester.connect(argv.reqConn);
console.log("Requester connecting to the " + argv.reqConn);

var publisher = zmq.socket("pub");
publisher.bind(argv.bind);

subscriber.on("message", function(data) {
  console.log("Data from publisher: " + data.toString());
  var tokensVSsession = JSON.parse(data);
  
  requester.send(tokensVSsession.tokens, function(response) {
    console.log("data from responder: " + response.toString());
    var userDetails = JSON.parse(response);
       
    var message = {
      id: userDetails.ID,
      tokens: tokensVSsession.tokens,
      session: tokensVSsession.session
    }
    
    console.log("publishing: " + JSON.stringify(message));
    publisher.send(JSON.stringify(message));
  });
});
