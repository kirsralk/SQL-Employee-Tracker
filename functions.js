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
                message: "Enter the new employee's manager id: ",
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
                        console.log("Your department was created successfully!");
                        // re-prompt the user for if they want to add more
                        // start();
                      }
                )
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
                        console.log("Your role was created successfully!");
                        // re-prompt the user for if they want to add more
                        // start();
                      }
                )
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
                        console.log("Your employee was created successfully!");
                        // re-prompt the user for if they want to add more
                        // start();
                      }
                )
                break;

            } 
        }); // end .then function
    } //end start() function

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
                        for (var i = 0; i < results.length; i++) {
                           console.log("ID: " + results[i].id + " || Name: " + results[i].name); 
                        }
                    })
                    break;
                
                case "Roles":
                    connection.query("SELECT * FROM role", function(err, results){
                        if (err) throw err;
                        for (var i = 0; i < results.length; i++) {
                            console.log("ID: " + results[i].id + " || Title: " + results[i].title + " || Salary: " + results[i].salary + " || Department ID: " + results[i].department_id); 
                        }
                    })
                    break;
                
                case "Employees":
                    connection.query("SELECT * FROM employees", function(err, results){
                        if (err) throw err;
                        for (var i = 0; i < results.length; i++) {
                            console.log("ID: " + results[i].id + " || First Name: " + results[i].first_name + " || Last Name: " + results[i].last_name + " || Role ID: " + results[i].role_id + " || Manager ID: " + results[i].manager_id); 
                        }
                    })
                    break;


                }
            });
    }

    //var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
    //query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    //query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";


    updateData() {
        var query = "SELECT employees.id, employees.first_name, employees.last_name, role.title FROM employees INNER JOIN role ON (employees.role_id = role.id) ORDER BY employees.id;"
        // var query = "SELECT employees.id, employees.first_name, employees.last_name, role.title";
        // query += "FROM employees INNER JOIN role ON (employees.role_id = role.id)";
        // query += " ORDER BY employees.id;";

        connection.query(query, function(err, results){
            if (err) throw err;
        
        inquirer
            .prompt([
                {
                    name: "emp_update",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].first_name + " " + results[i].last_name + " || " + results[i].title);
                        }
                        return choiceArray;
                    },
                    message: "Which employee would you like to update?"
                },
                
            ])
            .then(function(answer) {
                console.log(answer);
            });
        });
    }


} // end class

// function viewData() {

// }

// function updateData() {

// }

module.exports = Functions;