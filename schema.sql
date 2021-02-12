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
