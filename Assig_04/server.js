/*********************************************************************************
*  WEB322 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Andre Luiz Valle Rosa Student ID: 115997173 Date: 29 JUN 2018
*
*  Online (Heroku) Link: www.andrerosa322.herokuapp.com
*
********************************************************************************/
//PAREI Parte 5

const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const exphbs = require ("express-handlebars");
var dataSrv = require("./data-service.js");


var app = express();
app.use(express.static('public')); //to recognize the css files

//setting handlebars
app.engine('.hbs', exphbs({ extname: '.hbs',
                            defaultLayout: "main",
                            helpers: {       
                                      navLink: function(url, options){
                                      return '<li' +
                                     ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
                                     '><a href="' + url + '">' + options.fn(this) + '</a></li>';},

                                     equal: function (lvalue, rvalue, options) {
                                     if (arguments.length < 3)
                                     throw new Error("Handlebars Helper equal needs 2 parameters");
                                     if (lvalue != rvalue) {
                                     return options.inverse(this);
                                     } else {
                                     return options.fn(this); }}  
                  }
}));
app.set('view engine', '.hbs');




//This will add the property "activeRoute" to "app.locals" whenever the route changes, ie: if our route is
//"/employees/add", the app.locals.activeRoute value will be "/employees/add
app.use(function(req,res,next){
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
  next();
  });

//---------------------------------------------------------------------------
/// IMAGE UPLOADER
//---------------------------------------------------------------------------
const imgPath = "/public/images/uploaded";

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, imgPath))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });
// prepares to receive the file
app.post("/images/add", upload.single("imageFile"), function (req, res) {
  res.redirect("/images");
});
//---------------------------------------------------------------------------
app.get("/images", function (req, res) {
  fs.readdir(path.join(__dirname, imgPath), function (err, items) {

    var obj = { images: [] };
    var size = items.length;
    for (var i = 0; i < items.length; i++) {
      obj.images.push(items[i]);
    }
    //res.json(obj);
    //console.log(obj);
    res.render("images",obj);
  });

});
//---------------------------------------------------------------------------
/// END IMAGE UPLOADER
//---------------------------------------------------------------------------


//ADD EMPLOYEES
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/employees/add", function (req, res) {
  dataSrv.addEmployee(req.body)
    .then(() => {
      res.redirect("/employees");
    });
});



// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname, "/views/home.html"));
  res.render("home");
});

app.get("/about", function (req, res) {
  //res.sendFile(path.join(__dirname, "/views/about.html"));
  res.render("about");
});

app.get("/employees/add", function (req, res) {
  //res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
  res.render("addEmployee");
});

app.get("/images/add", function (req, res) {
 // res.sendFile(path.join(__dirname, "/views/addImage.html"));
 res.render("addImage");
});


//---------------------------------------------------------------------
//employee value route
app.get("/employee/:num", function (req, res) {
  console.log ("ENTROU");
  dataSrv.getEmployeeByNum(req.params.num)
  .then((data) => {
    console.log ("ENTROU" + data);
    res.render("employee", { employee: data });
  })
  .catch((err) => {
    res.render("employee",{message:"no results"});
  })
}); 

//ASSIGNMENT 4
app.post("/employee/update", (req, res) => {
  //console.log(req.body);
  dataSrv.updateEmployee(req.body)
                                   .then(() => {
                                    res.redirect("/employees");
                                   })
                                   .catch((err)=>{
                                     console.log (err);
                                   })
});


//--------------------------------------------------------------------
/*
By only calling res.json() from within .then() or .catch() 
we can ensure that the data will be in place (no matter how long it took to retrieve) 
before the server sends anything back to the client */
//------------------------------------------------------------------
//------------------------------------------------------------------
app.get("/employees", function (req, res) {

  if (req.query.status) {
    dataSrv.getEmployeesByStatus(req.query.status)
      .then((data) => {
        res.render("employees", {employees: data});
      })
      .catch((err) => {
        res.render({message: "no results"});
      })
  }
  else
    if (req.query.department) {
      dataSrv.getEmployeesByDepartment(req.query.department)
        .then((data) => {
          res.render("employees", {employees: data});
        })
        .catch((err) => {
          res.render({message: "no results"});
        })
    }
    else 
    if (req.query.isManager) {
      dataSrv.getEmployeesByManager(req.query.isManager)
        .then((data) => {
          res.render("employees", {employees: data});
        })
        .catch((err) => {
          res.render({message: "no results"});
        })
    }
    else {
      dataSrv.getAllEmployees()
        .then((data) => {
         // console.log(data);
          res.render("employees", {employees: data});
        })
        .catch((err) => {
          //console.log(err);
          res.render({message: "no results"});
        })
    }
});

//------------------------------------------------------------------
//------------------------------------------------------------------
app.get("/departments", function (req, res) {

  dataSrv.getDepartments()
    .then((data) => {
     // console.log("getDepartments JSON.");
      res.render("departments", {departments: data});
    })
    .catch((err) => {
     // console.log(err);
     res.render({message: "no results"});
    })
});
//------------------------------------------------------------------
//------------------------------------------------------------------
app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "/views/error404.html"));
})
//------------------------------------------------------------------
//------------------------------------------------------------------

//Call initialize method from data-service.js
//------------------------------------------------------------------
var HTTP_PORT = process.env.PORT || 8080;
//console.log("Ready for initialize");
dataSrv.initialize()
  .then(() => {
   // console.log("initialize.then");
    app.listen(HTTP_PORT, onHttpStart);  //start the server 
  })
  .catch(err => {
    console.log(err);
  })
  //------------------------------------------------------------------
  //------------------------------------------------------------------