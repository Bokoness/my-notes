let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mysql= require("mysql");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//connect to mysql
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'bokoness',
  database: 'mynotes'
});

app.get("/", (req, res) => {
   res.send("this will be the main page")
});

app.get("/notes", (req, res) => {
   console.log("Main page");
   let q = "SELECT * FROM notes";
   connection.query(q, (err, results) => {
        if(err)
            console.log(err);
        console.log(results);
        res.render("notes", {notes: results});
   });
});

// add a new note
app.post("/notes", (req, res) => {
   let newNote = req.body;
   let q = `INSERT INTO notes SET ?`;
   connection.query(q, newNote, (err, result) => {
        if(err)
            console.log(err);
        else {
               res.redirect("/notes");   
        }
   });

});

app.post("/notes/update", (req, res) => {
   let updateNote = req.body;
   let q = `UPDATE notes SET title="${updateNote.title}", content="${updateNote.content}" WHERE unique_id=${updateNote.id}`;
    connection.query(q, (err, result) => {
        if(err)
            console.log(err);
        else {
            res.redirect("/notes");
        }
    });
});

//delete a note
app.post("/notes/delete", (req, res) => {
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

app.listen(process.env.PORT, process.env.IP);