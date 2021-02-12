ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
DROP DATABASE IF EXISTS empTrack_DB;

/* Create database */
CREATE DATABASE empTrack_DB;
USE empTrack_DB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
	id INT NOT NULL auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

SELECT * FROM employees;