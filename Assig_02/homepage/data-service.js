
//fs module provides an API for interacting with the file system
const fs = require("fs");

var employees = [];
var departments = [];

//------------------------------------------------------------------------------------------
// FUNCTION INITIALIZE
// loads JSON data into global arrays
//------------------------------------------------------------------------------------------
module.exports.initialize = function () {

    var promise = new Promise((resolve, reject) => {
       
        try {

            fs.readFile('./data/employees.json', (err, data) => {
                if (err) throw err;

                employees = JSON.parse(data);
                console.log("INITIALIZE - load employees.");
            })

            fs.readFile('./data/departments.json', (err, data) => {
                if (err) throw err;

                departments = JSON.parse(data);
                console.log("INITIALIZE - load departments.");
            })

        } catch (ex) {
                      console.log("INITIALIZE - FAILURE.");
                      reject("INITIALIZE - FAILURE.");
                     }
        console.log("INITIALIZE - SUCCESS.");
        resolve("INITIALIZE - SUCCESS.");
    })

    return promise;
};

//------------------------------------------------------------------------------------------
// FUNCTION GETALLEMPLOYEES
// passes the array of employees
//------------------------------------------------------------------------------------------
module.exports.getAllEmployees = function () {

    var promise = new Promise((resolve, reject) => {
        
       //employees = [];
       if(employees.length === 0) {
        var err = "getAllEmployees() does not have any data.";
        reject({message: err});
       }  

    resolve (employees);
    })
    return promise;
};

//------------------------------------------------------------------------------------------
// FUNCTION GETMANAGERS
// passes the array of managers
//------------------------------------------------------------------------------------------
module.exports.getManagers = function () {

    var lManagers = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < employees.length; i++){
           if (employees[i].isManager == true) {
           lManagers.push(employees[i]);
           }
       }

       if(lManagers.length === 0) {
        var err = "getManagers() does not have any data.";
        reject({message: err});
       }  

    resolve (lManagers);
    })
    return promise;
};

//------------------------------------------------------------------------------------------
// FUNCTION GETDEPARTMENT
// passes the array of managers
//------------------------------------------------------------------------------------------
module.exports.getDepartments = function () {

    var promise = new Promise((resolve, reject) => {
        //departments = []; //to test errors
        if(departments.length === 0) {
         var err = "getDepartments() does not have any data.";
         reject({message: err});
        }  
 
     resolve (departments);
     })
     return promise;
};