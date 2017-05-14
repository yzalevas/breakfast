
// Standard set up for the express code to work with your code
var express = require('express');
var app = express();
var request = require('request');
/*
Routes a get request, and in this simple case - to the server's root. It sends a 
call back to handle the request. Not much will happen here, the call back is hardcoded  
to send a hello world string. But in theory you can do something with the req variable 
in the "/" directory, create a dynamic html and send that back
*/

app.get('/', function (req, res) {
    
    var requestData = { "userName": "saleshiran", "password": "12345678"};
                                           
    request({
        url: "https://affiliate.grouponisrael.co.il/affiliate/server/1.0/loginUser",
        method: "POST",
        json: requestData,   // <--Very important!!!
        headers:{
              'Content-Type': "application/x-www-form-urlencoded"
          }
    }, function (error, response, body){
        res.send(response);
    });     
  
});

app.get('/form', function (req, res) {
    
    var formData = { userName: "saleshiran", password: "12345678"};
                                           
    request.post({
        url: "https://affiliate.grouponisrael.co.il/affiliate/server/1.0/loginUser",
        formData: formData,   
    }, function (error, response, body){
        res.send(response);
    });     
});


/*
Firing up your server. For most of us noobs - all that matters here is
a) remember the port number - 8080 (in this example). If you use some other port 
number make sure you mention it explicitly when you make a call to the server.
b) the console statement is just a note to tell you the server is running
 */
app.listen(8081, function () {
  console.log('Example app listening on port 8080!');
  //call this app from https://<workspace name>-<user name>.c9users.io
});