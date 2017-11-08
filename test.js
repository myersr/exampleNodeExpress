var request = require("request");
    assert = require('assert');

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

var base_url= "http://localhost:"+portNum+"/";

/*
 * Basic two tests to check server has launched
 */
describe("Server root accessible", function() {

 /*
  * Request root '/' of app
  */
  describe("GET /", function() {

    /*
     * Check for return code 200 from root '/'
     */
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        console.log("checking '/' status code.");
        assert.equal(200, response.statusCode);
        done();

      });
    });

    /*
     * Check body of response contains the correct string. 
     */
    it("Root return correct body", function(done) {
      request.get(base_url, function(error, response, body) {
        console.log("Verifying '/' response body content.");
        assert.equal("Express App Root. Hello!", body);
        done();

      })
    });  
 
  });
});
