//load the core node http module
const http = require("http");
//load the core node filesytem (fs) module, using the js promises instead of callbacks
const fs = require("fs").promises;

const path = require('path');
//create a function to respond to http requests
const requestListener = function(req, res){
  console.log(req.url);
  if (req.url === "/"){
  //check request URL, if root, return html file
    fs.readFile(__dirname + '/page.html').then(
      contents => {
        //set http response header entry
        res.setHeader("Content-Type","text/html; charset=UTF-8");
        //return 200 OK http status code
        res.writeHead(200);
        //send back file contents + close response
        res.end(contents);
      });
  }
    else if(req.url === "/style.css"){
    fs.readFile(__dirname + '/style.css').then(
      contents => {
        //set http response header entry
        res.setHeader("Content-Type","text/css; charset=UTF-8");
        //return 200 OK http status code
        res.writeHead(200);
        //send back file contents + close response
        res.end(contents);
      });
    }
  else {
    // if reuqest url not root, return json file
    fs.readFile( __dirname + '/skaters.json').then(contents => {
      //set http response header entry
      res.setHeader("Content-Type", "application/json; charset=UTF-8");
      //return 200 OK http status code
      res.writeHead(200);
      res.end(contents);
    });
  }
};
//create an http server instance
const server = http.createServer(requestListener);
    

// define the TCP port and IP address to tell our http server to listen to
const host = "0.0.0.0"; //repl.it ois going to override this from localhost to your workspace webview hostname URL
const port = "8080"; //replit is going to override this to use port 443 (SSL https)

//call the listen() method to start listening to http requests
server.listen(
  port,
  host,
  () => { console.log(`Server is running on http://${host}:${port}`);
        }
);


