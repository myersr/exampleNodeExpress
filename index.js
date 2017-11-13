var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');

/*
 * try block to set port
 *
 *   Try to set string portNum to environment variable EXP_APP_PORT
 *   log to console it's checking env
 *
 *   if it identifies EXP_APP_PORT:
 *     log identified port
 *
 *   else
 *     log 'using default 8181 port'
 *     set portNum to 8181
 */
try {
  var portNum = process.env.EXP_APP_PORT;
  console.log("Checking ENV....");

  if (portNum) {
    console.log("Set to:  %s", portNum);

  } else {
    console.log("ENV variable EXP_APP_PORT not set.");
    console.log("Using Default Port: 8181");
    portNum = "8181";

  }
} catch (err) {
  console.error(err);

}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*
 * Basic get request. Root exstension that logs to console and returns a string.
 */
app.get('/', function (req,res) {
  console.log("Got got, at '/'");
  res.send("Express App Root. Hello!");

})

/*
 * Example Post. @/post that logs to console and returns confirmation string
 */
app.post('/post', function (req,res) {
  console.log("Got posted.", req.body);
  res.send("Success! You made a POST");
})

/*
 * Mounts the request function @ directory 'public'
 *
 * request /index serves up index.html located at the middleware functions mount
 *   currently mounted at 'public'
 *   logs to console
 */
app.use(express.static( __dirname + '/public' ));
app.get('/index', function (req,res) {
  console.log("Requested index");
  res.sendFile(__dirname + "/public/" + "index.html");

})

/*
 * get to /sub with parameters.
 *   This get originates from the form served from index.html
 *   contains one text field: field1
 *   logs the response to console.
 */
app.get('/sub', function (req,res) {
  console.log("JSON Request");
  response = {
    field1 : req.query.field1
  }
  console.log(response);
  res.end(JSON.stringify(response));

})

/*
 * listen takes:
 *
 *   portNum: String that identifies port for app to listen
 *
 *   function that starts the server
 *     identifies host address for logging
 *     identifies port for logging
 *     logs ready message to console
 */
var server = app.listen(portNum, function () {
  var hostAddr = server.address().address
  var port     = server.address().port
  console.log("App running on %s:%s", hostAddr, port)

})
