let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mysql= require("mysql");
let methodOverride = require("method-override");
let sessions = require("client-sessions");
let bcrypt = require("bcryptjs");
let loginRoutes = require('./routes/login-routes');
let registerRoute = require('./routes/register-route');
let notesRoutes = require('./routes/notes-routes');
let authenticate = require('./middleware/authenticate');

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
   res.redirect("/login");
});

//register routes
app.use('/', registerRoute);

//login routes
app.use('/', loginRoutes);

//logout
app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/login");
});

//notes
app.use("/", notesRoutes);

// app.listen(process.env.PORT, process.env.IP);
app.listen(3000, ()=> console.log("port 3000 is active"));