var inquirer = require("inquirer");

class Functions {
    constructor() {

    }

    addData() {
        inquirer
         .prompt({
            name: "action",
            type: "rawlist",
            message: "Welcome to Employee Tracker. What would you like to do?",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "Add departments, roles, employees":
                addData();
                break;
            
            case "View departments, roles, employees":
                viewData();
                break;
            
            case "Update employee roles":
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