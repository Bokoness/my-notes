let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mysql= require("mysql");
let methodOverride = require("method-override");
let sessions = require("client-sessions");
let bcrypt = require("bcryptjs");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//setting up Mozilla sessions (client-sessions)
app.use(sessions({
    cookieName: "session",
    secret: "Woosfsadf123sad",
    duration: 60 * 60 * 1000 // 60 mins
}));

//connect to mysql
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bb8b9jqr',
    database: 'mynotes'
});

//select mynotes database
connection.query('USE mynotes', (err, results) => {
    if(err)
        console.log(err);
});

app.get("/", (req, res) => {
   res.send("you are now logged in");
});

//==============
//|  REGISTER  |
//==============

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    let newUser = req.body;
    console.log(newUser.password);
    let hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash;
    let q = `INSERT INTO users SET ?`;
    connection.query(q, newUser, (err, result) => {
        if(err)
            console.log(err);
        else {
               res.redirect("/login");   
        }
   });
});

//====================
//|  Login / Logout  |
//====================

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    let q = `SELECT * FROM users WHERE email="${req.body.email}"`;
    connection.query(q, (err, result) => {
        let user = result[0];
        if(err)
            console.log(err);
        else {
            if(!user || !bcrypt.compareSync(req.body.password, user.password) ) {
                let error ={errorMessage: "Incorrent email / password"};
                console.log(error);
                return res.render("login", {error});
            } else {
                req.session.userId = user.id;
                console.log("session added");
                res.redirect("/notes");
            }   
        }
   });
});

//logout
app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/login");
});

//===========
//|  NOTES  |
//===========
//get notes
app.get("/notes", (req, res) => {
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
app.post("/notes", (req, res) => {
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

// app.listen(process.env.PORT, process.env.IP);
app.listen(3000, ()=> console.log("port 3000 is active"));