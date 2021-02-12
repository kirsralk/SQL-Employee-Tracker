var mysql = require("mysql");
var inquirer = require("inquirer");

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

class Functions {
    constructor() {

    }

    addData() {
        inquirer
         .prompt([
            {
                name: "action",
                type: "rawlist",
                message: "Welcome to Employee Tracker. What would you like to do?",
                choices: [
                    "Add a department",
                    "Add a role",
                    "Add an employee"
                ]},
            {
                name: "dept",
                type: "input",
                message: "Enter the new department name: "
            }
        ])
        .then(function(answer) {
            switch (answer.action) {
            case "Add a department":
                // console.log("this line ran");
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        name: answer.dept
                    }
                )
                break;
            
            case "Add a role":
                viewData();
                break;
            
            case "Add an employee":
                updateData();
                break;
            } 

        }); // end .then function
    } //end start() function


} // end class

// function viewData() {

// }

// function updateData() {

// }

module.exports = Functions;