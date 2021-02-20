USE empTrack_db;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kirsi", "Ralko", 3, NULL), ("John", "Smith", 2, 1), ("Jane", "Doe", 2, 1), ("Joe", "Taylor", 1, 1);

INSERT INTO department (name)
VALUES ("Accounting"), ("Marketing"), ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 50000, 1), ("Advertising Rep", 40000, 2), ("HR Manager", 70000, 3);



