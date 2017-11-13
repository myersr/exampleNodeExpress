# exampleNodeExpress
Looking to be a very simple express app to test deployment services or any other utilities. Includes test cases and several routes. All configuration should be handled by ENV variables.
____
### Quick-start
To install the dependencies 

`npm install` or `npm install --production`  

and then run with 

 `npm start`.
  
To test the app, run  

`npm test`

 while the app is running. The dependencies for testing will not be installed with --production. _Note that if you set the port with an environment variable, it must also be set in the tty session where you run test._

### Configuration. 
Very little configuration neccessary for routing and none if your are okay with the default behavior.
If you want to change the port from the default 8181 or run tests on an external url, use an environment variable.
* set environment variable `EXP_APP_PORT` to desired port
   * i.e. `export EXP_APP_PORT=8008`
* set env var `EXP_URL` to desired url
   * i.e. `export EXP_URL=http://example.com` 
      * *please include http://*
      * *leave off trailing /*
The port is confirmed in both `npm start` and `npm test` so this works with both as long as it is exported in both or setup in your .bashrc/.bash_profile. You can easily check with `echo $EXP_APP_PORT`. 
The URL is only checked when running `npm test` and included so you can run tests on a deployed or external app.

### Routes
Routes are as followed
```
'/' GET
  returns message. Has test written for status code and response body verification.
'/post' POST
  post that returns a confirmation string. Second form on /index. Submits one data field. 
'/index' GET
  serves /public/index.html page. This page contains a form.
'/sub' GET
  submit target of the form on index.html. Takes in json data with one field. {"field1":"some text"}
```

### Deployment/Running under services
I am hoping to implement several different use cases for deployment. The hope for this repo is to create a simple lightweight app to be used for all forms of testing. I will update the options as they are added below. Feel free to fork or create a pull request if you have an option to add.
* pm2 ~ node app manager. [Docs](http://pm2.keymetrics.io/docs/usage/quick-start/)
  * Install/Update:
    * `npm install pm2@latest -g`; `pm2 update`
  * Run with pm2:
    * The process.json file defines the application and is suitable for deployment. [Docs](http://pm2.keymetrics.io/docs/usage/application-declaration/)
      * `pm2 start process.json --env production`
    * If you're using Jenkins and deploying on the same box. Add line `BUILD_ID=dontKillMe` before the start shell command to not have Jenkins destroy the process. This is not needed if you are using our enterprise version as you will be remotely connecting. 
        * ~~I don't know why but Jenkins kills every process that it creates. Seems the opposite behavior that you would expect from an automated deployment service. [More here](https://wiki.jenkins.io/display/JENKINS/ProcessTreeKiller)~~
          * I get it now, but I don't have to like it.
    * To test from the cl without Jenkins:
      * `pm2 start index.js --name "test-app"`
        * This will spawn a pm2 daemon and run our app under the name "test-app"
* docker
  * Either build an image locally with,
    * `sudo docker build . -t example-node-express`
  * Or pull an image from the trusted registry with
    * `docker pull docker.optum.com/rmyers19/example-node-express`
  * Then to spawn a container after a build or pull run,
    * `sudo docker run -d -p 8001:8181 --name express-docker docker.optum.com/rmyers19/example-node-express`
      * Suppliment `docker.optum.com.....` with whatever name you gave after -t if you built locally.

### Testing
Uses mocha for testing. Mocha executes the tests in `test.js`. 
Currently only checks that
1. '/' returns a status code of 200
2. '/' returns the correct response body exactly.  
3. '/post' will take a POST with populated data field and returns 200 & expected body response string.

Run with `npm test` and the dependencies are saved in *devDependencies* so they will not be installed with `npm install --production`.

### Fire wall 
For Centos 7 to open up the firewall `sudo firewall-cmd --zone=public --add-port=8181/tcp --permanent` && `firewall-cmd --reload` to save.
