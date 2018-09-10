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

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
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
                console.log("userId: " ,user.id);
                let token = {
                    id: user.id,
                    hash: bcrypt.hashSync(user.id.toString(), 14),
                }
                req.session.token = token;
                console.log("session added");
                res.redirect("/notes");
            }   
        }
   });
});

module.exports = router;