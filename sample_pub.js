var zmq = require("zmq");
var publisher = zmq.socket("pub");
publisher.bind("tcp://*:6003", function(err) {
  if(err)
    console.log(err)
  else
    console.log("Ok!")
    setInterval(function() {
      publisher.send("Hello world");
      console.log("Sending data to the subscribers...");
    }, 3000);
});




process.on('SIGINT', function() {
  publisher.close();
  console.log('\nClosed')
});

