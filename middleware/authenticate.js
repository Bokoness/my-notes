const bcrypt = require("bcryptjs");

const authenticate = (req, res, next) => {
    let token = req.session.token;
    if(!token) {
        res.send("You need to be logged in!");
    } else if(!bcrypt.compareSync(token.id.toString(), token.hash)) {
        res.send("Something Wrong Happend...")
    } else {
        next();
    }
};

module.exports = authenticate;