const User = require("../models/user");
const router = require("express").Router();

router.route("/create").post((req, res) =>
{
    User.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.json(data);
        }
    })
});


module.exports = router