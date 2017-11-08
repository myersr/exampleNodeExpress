# exampleNodeExpress
Looking to be a very simple express app to test deployment services or any other utilities. Includes test cases and several routes. All configuration can be handled by ENV variables.
____
### Configuration. 
Little configuration neccessary for routing and none if your are okay with the default.
If you want to change the port from the default 8181 use an environment variable.
* set environment variable `EXP_APP_PORT` to wanted port
   * i.e. `export EXP_APP_PORT=8008`
The port is confirmed in both `npm start` and `npm test` so this works with both.

### Routes
Routes are as followed
```
'/' GET
  returns message. Has test written for status code and response body verification.
'/post' POST
  post that returns a confirmation string. Nothing is done with any data
'/index' GET
  serves /public/index.html page. This page contains a form.
'/sub' GET
  submit target of the form on index.html. Takes in json data with one field. {"field1":"some text"}
```

### Testing
Uses mocha for testing. Mocha executes the tests in `test.js`. 
Currently only checks that
1. '/' returns a status code of 200
2. '/' returns the correct response body exactly.  

Run with `npm test` and the dependencies are saved in *devDependencies*.

### Fire wall 
For Cent 7 to open up the firewall `sudo firewall-cmd --zone=public --add-port=8181/tcp --permanent` && `firewall-cmd --reload` to save.
