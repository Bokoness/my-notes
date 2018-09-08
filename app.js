let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mysql= require("mysql");
let methodOverride = require("method-override");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


//connect to mysql
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'bokoness',
  database: 'mynotes'
});

//select mynotes database
connection.query('USE mynotes', (err, results) => {
    if(err)
        console.log(err);
});

connection.query(`SET character_set_connection=utf8; SET character_set_connection=utf8; SET character_set_database=utf8; SET character_set_results=utf8; `, (err, results) => {
    if(err)
        err;
});

app.get("/", (req, res) => {
   res.send("this will be the main page")
});

//get notes
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

//update notes
app.put("/notes/:id", (req, res) => {
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
app.delete("/notes/:id", (req, res) => {
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