/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Andre Luiz Valle Rosa Student ID: 115997173 Date: 27 May 2018
*
*  Online (Heroku) Link: www.andrerosa322.herokuapp.com
*
********************************************************************************/ 


var express = require("express");
var path = require("path");
var dataSrv = require("./data-service.js");

var app = express();
app.use(express.static('public/css')); //to recognize the css files
app.use(express.static('img')); 

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
  });

app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
  });


  /*
  By only calling res.json() from within .then() or .catch() 
  we can ensure that the data will be in place (no matter how long it took to retrieve) 
  before the server sends anything back to the client */
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  app.get("/employees", function(req,res){
    dataSrv.getAllEmployees()
                             .then((data) => {
                               console.log ("getAllEmployees JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  app.get("/managers", function(req,res){
    dataSrv.getManagers()
                             .then((data) => {
                               console.log ("getManagers JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  app.get("/departments", function(req,res){
   
   dataSrv.getDepartments()
                           .then((data) => {
                               console.log ("getDepartments JSON.");
                               res.json(data);
                           })
                           .catch((err) => {
                               console.log(err);
                               res.json(err);
                           })
  });
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
  })
  //------------------------------------------------------------------
  //------------------------------------------------------------------

//Call initialize method from data-service.js
//------------------------------------------------------------------
console.log ("Ready for initialize");
dataSrv.initialize()
                    .then(() => {
                          console.log ("initialize.then");
                          app.listen(HTTP_PORT, onHttpStart);  //start the server 
                    })
                    .catch(err => {
                          console.log(err);
                    })
  //------------------------------------------------------------------
  //------------------------------------------------------------------