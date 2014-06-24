[![website link]](https://github.com/stepankarslyan/google_auth_token_enricher)

  Fast, scalable, high performance, minimalist, nodejs app 

## Dependencies

* Onicollet/zmq
* Optimist

## Performance

* Binds to the tcp://*:[1112] port(by default)

```js
var publisher = zmq.socket("pub");
publisher.bind("tcp://*:1112");

console.log('Binding to the 1112...');
publisher.send(data);

```

* Requester zmq socket connects to the tcp://localhost:[6005] port(by default)

```js

var requester = zmq.socket("asyncreq");
requester.connect("tcp://localhost:6005");
console.log("Requester connecting to the localhost 6005...");
requester.send(data, function(response) {
  console.log(data);
});

```
* Subscriber zmq socket connects to the tcp://localhost:[6003] port(by default)

```js

var subscriber = zmq.socket("sub");
subscriber.connect("tcp://localhost:6003");
subscriber.subscribe("");
console.log("Subscriber connecting to the localhost 6003...");

```

## Terminal shortcut commands

 --subConn: "tcp://localhost:???",
  --bind: "tcp://*:???",
  --reqConn: "tcp://localhost:???" 
