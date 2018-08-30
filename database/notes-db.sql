CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    content VARCHAR(100)
);

INSERT INTO notes (title, content) 
VALUES ('Note1', 'Content1'),
('Note2', 'Content2'),
('Note3', 'Content3'),
('Note4', 'Content4'),
('Note5', 'Content5');