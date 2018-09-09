var express = require('express');
var router = express.Router();
let bodyParser = require("body-parser");
let sessions = require("client-sessions");
let mysql= require("mysql");
let bcrypt = require("bcryptjs");

//connect to mysql
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bb8b9jqr',
    database: 'mynotes'
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
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

module.exports = router;