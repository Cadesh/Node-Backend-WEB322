
//fs module provides an API for interacting with the file system
const fs = require("fs");

var employees = [];
var departments = [];




//------------------------------------------------------------------------------------------
// GET EMPLOYEE BY NUM - Assignment 03
//------------------------------------------------------------------------------------------
module.exports.getEmployeeByNum = function (num) {
  //  console.log (num);
    var locEmp;
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < employees.length; i++){
           if (employees[i].employeeNum == num) {
             //  console.log (num + employees[i]);
               locEmp = employees[i];
               i = employees.length;
           }
       }

       if(locEmp === "undefined") {
        var err = "getEmployeesByNum() does not have any data.";
        reject({message: err});
       }  

    resolve (locEmp);
    })
    return promise;

};

//------------------------------------------------------------------------------------------
// GET EMPLOYEE BY STATUS - Assignment 03
//------------------------------------------------------------------------------------------
module.exports.getEmployeesByStatus = function (statusId) {
    //console.log (statusId);
    var locEmp = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < employees.length; i++){
           //console.log ("status - " + employees[i].status);
           if (employees[i].status == statusId) {
               locEmp.push(employees[i]);
           }
       }

       if(locEmp.length === 0) {
        var err = "getEmployeesByStatus() does not have any data.";
        reject({message: err});
       }  

    resolve (locEmp);
    })
    return promise;

};
//------------------------------------------------------------------------------------------
// GET EMPLOYEE BY DEPARTMENT - Assignment 03
//------------------------------------------------------------------------------------------
module.exports.getEmployeesByDepartment = function (departmentId) {

    var locEmp = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < employees.length; i++){
           if (employees[i].department == departmentId) {
               locEmp.push(employees[i]);
           }
       }

       if(locEmp.length === 0) {
        var err = "getEmployeesByDepartment() does not have any data.";
        reject({message: err});
       }  

    resolve (locEmp);
    })
    return promise;

};
//------------------------------------------------------------------------------------------
// GET EMPLOYEE BY MANAGER - Assignment 03
//------------------------------------------------------------------------------------------
module.exports.getEmployeesByManager = function (managerBool) {
   
    var locEmp = [];
    var promise = new Promise((resolve, reject) => {
      
       for (var i=0; i < employees.length; i++){
           if (employees[i].isManager == managerBool) {
               locEmp.push(employees[i]);
           }
       }

       if(locEmp.length === 0) {
        var err = "getEmployeesByManager() does not have any data.";
        reject({message: err});
       }  

    resolve (locEmp);
    })
    return promise;

};

//------------------------------------------------------------------------------------------
// ADD NEW EMPLOYEE - assignment 03
//------------------------------------------------------------------------------------------
module.exports.addEmployee = function (employeeData) {

    var promise = new Promise((resolve, reject) => {
        
       if (typeof employeeData.isManager === "undefined") {
            employeeData.isManager = false;
       } else {
            employeeData.isManager = true;
       }

       employeeData.employeeNum = employees.length + 1;
       employees.push(employeeData);
        
     resolve (employees);
     })
     return promise;

};


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
              //  console.log("INITIALIZE - load employees.");
            })

            fs.readFile('./data/departments.json', (err, data) => {
                if (err) throw err;

                departments = JSON.parse(data);
              //  console.log("INITIALIZE - load departments.");
            })

        } catch (ex) {
               //       console.log("INITIALIZE - FAILURE.");
                      reject("INITIALIZE - FAILURE.");
                     }
     //   console.log("INITIALIZE - SUCCESS.");
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
// passes the array of departments
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

//Assignment 4
module.exports.updateEmployee = function (employeeData) {

    var found = false;
    var promise = new Promise((resolve, reject) => {
        
        for (var i=0; i < employees.length; i++){
            if (employees[i].employeeNum == employeeData.employeeNum) {
               // console.log ("Achou.");
                employees[i] = employeeData;
                found = true;
            }
        }
        if(found === false) {
         var err = "Cannot find employee to update.";
        // console.log ("Nao achou.");
         reject({message: err});
        }  
        resolve (employees);
     })
     return promise;
};