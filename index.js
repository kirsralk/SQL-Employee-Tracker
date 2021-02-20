var mysql = require("mysql");
var inquirer = require("inquirer");
const Functions = require("./functions");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "empTrack_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

// function to run initial prompt to user
function start() {
    const grabfunction = new Functions();
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Welcome to Employee Tracker. What would you like to do?",
            choices: [
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles",
                "Delete departments, roles, employees"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "Add departments, roles, employees":
                grabfunction.addData();
                break;
            
            case "View departments, roles, employees":
                grabfunction.viewData();
                break;
            
            case "Update employee roles":
                grabfunction.updateData();
                break;
            
            case "Delete departments, roles, employees":
                grabfunction.deleteData();
                break;
            }
        

    });
        // .then(() => grabfunction.quit());
    // .then(() => grabfunction.quit()); // end .then function
} //end start() function
