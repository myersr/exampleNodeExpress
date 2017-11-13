var request = require("request");
    assert = require('assert');

try {
  console.log("Checking ENV....");
  var portNum = process.env.EXP_APP_PORT;
  var expURL = process.env.EXP_URL;

  if (portNum) {
    console.log("Port set to:  %s", portNum);

  } else {
    console.log("ENV variable EXP_APP_PORT not set.");
    console.log("Using Default Port: 8181");
    portNum = "8181";

  }

  /*
  * Attempt to set app URL from environment and default back to localhost if none.
  * This is for users who are running tests on an external instance of the app.
  */
  if (expURL) {
    console.log("URL set to: %s",expURL);
  } else {
    console.log("ENV variable EXP_URL not set.");
    console.log("Assuming LOCALHOST.");
    expURL = "http://localhost";
  }

} catch (err) {
  console.error(err);

}

var base_url= expURL + ":" + portNum; //to plug into requests. Fully customizable. 

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
      request.get(base_url+"/", function(error, response, body) {
        console.log("checking '/' status code.");
        assert.equal(200, response.statusCode);
        done();

      });
    });

    /*
     * Check body of response contains the correct string. 
     */
    it("Root return correct body", function(done) {
      request.get(base_url+"/", function(error, response, body) {
        console.log("Verifying '/' response body content.");
        assert.equal("Express App Root. Hello!", body);
        done();

      })
    });

 
  });

/*
 * Testing our post request function.
 * @ /post
 */
  describe("POST /post", function() {
    it("Testing a POST submission to /post", function(done) {
      //Submitting a post to /post with the body populated from our form: dictionary.
      request.post({url:base_url + '/post',form:{postField:"test data"}},function(err, httpResponse, body) {
        if(err) {
          done(err);//On error return our error code
        }
        assert.equal(200, httpResponse.statusCode); //Make sure it's response code 200 OK
        assert.equal("Success! You made a POST", body); //String match on known successful string response
        done();
      })
    });
  });
        
});
