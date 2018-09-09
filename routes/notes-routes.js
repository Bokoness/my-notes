var express = require('express');
var router = express.Router();
let bodyParser = require("body-parser");
let mysql= require("mysql");

//connect to mysql
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bb8b9jqr',
    database: 'mynotes'
});

router.get("/notes", (req, res) => {
    console.log(req.session);
    let q = `SELECT * FROM users WHERE id=${req.session.userId}`;
    connection.query(q, (err, user) => {
        if(err) {
             console.log(err);
        } else {
             let q = `SELECT * FROM notes WHERE userId=${user[0].id}`;
             connection.query(q, (err, notes) => {
             if(err) {
                 console.log(err);
             } else {
                 res.render("notes", {user: {firstName: user[0].firstName, lastName: user[0].lastName}, notes});
             }
         });
        }
    })
 });
 
 // add a new note
 router.post("/notes", (req, res) => {
    let newNote = req.body;
    let q = `INSERT INTO mynotes.notes (title, content, userId) VALUES ('${newNote.title}', '${newNote.content}', ${req.session.userId})`;
    connection.query(q, (err, result) => {
         if(err)
             console.log(err);
         else {
                res.redirect("/notes");   
         }
    });
 
 });
 
 //update notes
 router.put("/notes/:id", (req, res) => {
    let updateNote = req.body;
    console.log(req.params.id);
    let id = req.params.id;
    console.log("=======================================")
    console.log(req.body);
    let q = `UPDATE notes SET title="${updateNote.title}", content="${updateNote.content}" WHERE id=${id}`;
     connection.query(q, (err, result) => {
         if(err)
             console.log(err);
         else {
             res.redirect("/notes");
         }
     });
 });
 
 //delete a note
 router.delete("/notes/:id", (req, res) => {
     let id = req.body.id;
     let q = `DELETE FROM notes WHERE id=${id}`;
     connection.query(q, (err, result) => {
         if(err)
             console.log(err);
         else {
             console.log(`Someone deleted note id: ${id}`);
             res.redirect("/notes");
         }
     })
 });

 module.exports = router;