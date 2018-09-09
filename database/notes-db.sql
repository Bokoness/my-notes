DROP DATABASE mynotes;
CREATE DATABASE mynotes;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    firstName VARCHAR(100),
    lastName VARCHAR(100)
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    content VARCHAR(100)
);



