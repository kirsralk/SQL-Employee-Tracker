var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

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

function quit() {
    console.log("\nThank you for using Employee Tracker!");
    process.exit(0);
}; 

class Functions {
    constructor() {
        this.test = 0;
    }

    addData() {
        inquirer
         .prompt([
            {
                name: "action",
                type: "rawlist",
                message: "Which would you like to add?",
                choices: [
                    "Add a department",
                    "Add a role",
                    "Add an employee"
                ]
            },
            {
                name: "dept",
                type: "input",
                message: "Enter the new department name: ",
                when: (answers) => answers.action === "Add a department"
            },
            {
                name: "role_title",
                type: "input",
                message: "Enter the new role title: ",
                when: (answers) => answers.action === "Add a role"
            },
            {
                name: "role_salary",
                type: "input",
                message: "Enter the new role salary: ",
                when: (answers) => answers.action === "Add a role"
            },
            {
                name: "role_dept",
                type: "input",
                message: "Enter the new role's department id: ",
                when: (answers) => answers.action === "Add a role"
            },
            {
                name: "emp_first",
                type: "input",
                message: "Enter the new employee's first name: ",
                when: (answers) => answers.action === "Add an employee"
            },
            {
                name: "emp_last",
                type: "input",
                message: "Enter the new employee's last name: ",
                when: (answers) => answers.action === "Add an employee"
            },
            {
                name: "emp_role",
                type: "input",
                message: "Enter the new employee's role id: ",
                when: (answers) => answers.action === "Add an employee"
            },
            {
                name: "emp_man",
                type: "input",
                message: "Enter the new employee's manager id (if no manager, enter NULL): ",
                when: (answers) => answers.action === "Add an employee"
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
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("\nYour department '" + answer.dept + "' was created successfully!");
                      });
                connection.query("SELECT * FROM department", function(err, results){
                    if (err) throw err;
                    console.log("\nThe current DEPARTMENTS are:");
                    console.table(results);
                    quit(); 
                });
                break;
            
            case "Add a role":
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.role_title,
                        salary: answer.role_salary,
                        department_id: answer.role_dept
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("\nYour role '" + answer.role_title + 
                        "' with a salary of " + answer.role_salary + " was created successfully!");
                      });
                connection.query("SELECT * FROM role", function(err, results){
                    if (err) throw err;
                    console.table(results);
                    quit(); 
                });
                break;

            case "Add an employee":
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        first_name: answer.emp_first,
                        last_name: answer.emp_last,
                        role_id: answer.emp_role,
                        manager_id: answer.emp_man
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("\nYour employee '" + answer.emp_first + " " + answer.emp_last + "' was created successfully!");
                        console.table()

                    });
                connection.query("SELECT * FROM employees", function(err, results){
                    if (err) throw err;
                    console.log("\nThe current EMPLOYEES are:");
                    console.table(results);
                    quit();
                });
                break;
            } 
        }); // end .then function
    } //end addData() function

    viewData() {
        inquirer
            .prompt([
                {
                    name: "action",
                    type: "rawlist",
                    message: "Which data whould you like to view?",
                    choices: [
                        "Departments",
                        "Roles",
                        "Employees"
                    ]
                },
            ])
            .then(function(answer) {
                switch (answer.action) {
                case "Departments":
                    connection.query("SELECT * FROM department", function(err, results){
                        if (err) throw err;
                        console.table(results);
                        quit(); 
                    })
                    break;
                    
                
                case "Roles":
                    connection.query("SELECT * FROM role", function(err, results){
                        if (err) throw err;
                        console.log("\nThe current ROLES are:");
                        console.table(results);
                        quit(); 
                    })
                    break;
                
                case "Employees":
                    connection.query("SELECT * FROM employees", function(err, results){
                        if (err) throw err;
                        console.log("\nThe current EMPLOYEES are:");
                        console.table(results);
                        quit();
                    })
                    break;
                }
            });
    }


    updateData() {
        
        var query = "SELECT employees.id, employees.first_name, employees.last_name, role.title FROM employees INNER JOIN role ON (employees.role_id = role.id) ORDER BY employees.id;"
        connection.query(query, function(err, results) {
            if (err) throw err;

            // once you have the employees, prompt the user for which employee they'd like to update
            inquirer
              .prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "Enter the Employee ID of the employee you wish to update:",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            console.log(" Error: Please enter a valid number");
                            return false;
                        }
                    }
                },
                {
                    name: "new_role",
                    type: "input",                  
                    message: "Enter a new role ID for this employee:"
                }  
              ])
              .then(function(answer) {
                
                connection.query(
                    "UPDATE employees SET ? WHERE ?",
                    [
                      {
                        role_id: answer.new_role
                      },
                      {
                        id: answer.choice
                      }
                    ],
                    function(error) {
                        if (error) throw err;   

                        var i = answer.choice;
                        console.log("\nRole was successfully updated.");
                    }
                  );
                connection.query("SELECT * FROM employees", function(err, results){
                    if (err) throw err;
                    console.table(results);
                    quit();
                });
              });
            });
            
    }

    deleteData() {

        var query = "SELECT * FROM department;";
        // connection.query("SELECT * FROM employees", function(err, results) {
        connection.query(query, function(err, results) {
            if (err) throw err;

        inquirer
         .prompt([
            {
                name: "action",
                type: "rawlist",
                message: "Which would you like to delete?",
                choices: [
                    "Delete a department",
                    "Delete a role",
                    "Delete an employee"
                ]
            },
            {
                name: "dept",
                type: "input",
                message: "Enter the ID of the department to delete: ",
                when: (answers) => answers.action === "Delete a department"
            },
            {
                name: "role",
                type: "input",
                message: "Enter the ID of the role to delete: ",
                when: (answers) => answers.action === "Delete a role"
            },
            {
                name: "employee",
                type: "input",
                message: "Enter the ID of the employee to delete: ",
                when: (answers) => answers.action === "Delete an employee"
            }
        ])
        .then(function(answer) {
            switch (answer.action) {
            case "Delete a department":
                // console.log("this line ran");
                connection.query(
                    "DELETE FROM department WHERE ?",
                    {
                        id: answer.dept
                    },
                    function(err) {
                        if (err) throw err;
                        // var i = (answer.dept);
                        console.log("\nDepartment was deleted successfully.");
                });
                connection.query("SELECT * FROM department", function(err, results){
                        if (err) throw err;
                        console.table(results);
                        quit();
                });
                break;
            
            case "Delete a role":
                // console.log("this line ran");
                connection.query(
                    "DELETE FROM role WHERE ?",
                    {
                        id: answer.role
                    },
                    function(err) {
                        if (err) throw err;
                        // var i = (answer.dept);
                        console.log("\nRole was deleted successfully.");
                });
                connection.query("SELECT * FROM role", function(err, results){
                        if (err) throw err;
                        console.table(results);
                        quit();
                });
                break;

            case "Delete an employee":
                // console.log("this line ran");
                connection.query(
                    "DELETE FROM employees WHERE ?",
                    {
                        id: answer.employee
                    },
                    function(err) {
                        if (err) throw err;
                        // var i = (answer.dept);
                        console.log("\nEmployee was deleted successfully.");
                        quit();
                });
                connection.query("SELECT * FROM role", function(err, results){
                        if (err) throw err;
                        console.table(results);
                        quit();
                });
                break;
            } //end switch
        }); // end .then function
        }); // end connection.query
    }// end deleteData()
} // end class

module.exports = Functions;