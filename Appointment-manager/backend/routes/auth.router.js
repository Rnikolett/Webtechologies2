const User = require("../models/user");
const router = require("express").Router();
var token = require("../JWTtoken/JWT").token;
const RSA_PUBLIC_KEY =  require("../JWTtoken/JWT").RSA_PUBLIC_KEY;
const jwt = require('jsonwebtoken');
const token_timeout = require("../JWTtoken/JWT").timeout;

router.route("").post((req, res) => {
    let founduser;
    User.findOne(req.body, '_id name', ( err,data ) => {
        founduser = data;
        if (!founduser) return res.sendStatus(401);
        token = jwt.sign({ userID: founduser._id, username: founduser.name }, RSA_PUBLIC_KEY, { expiresIn: token_timeout+'s' });
        res.send({
            token: token,
            timeout: token_timeout,
            username: founduser.name
        });
    });
});
module.exports = router