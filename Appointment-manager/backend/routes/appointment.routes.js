const Appointment = require("../models/appointment");
const router = require("express").Router();
const checkIfAuthenticated = require("../JWTtoken/Validator").checkIfAuthenticated;
const getLoggedInUserIdFromLogin = require("../JWTtoken/Validator").getLoggedInUserIdFromLogin;

router.route("/getByUser").get(checkIfAuthenticated, (req, res) => {
    const userId = getLoggedInUserIdFromLogin(req.headers.authorization)
    Appointment.find({ 'userid': userId }, (error, data)=> {
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
});

router.route("/create").post(checkIfAuthenticated,(req, res) =>{
    const userId = getLoggedInUserIdFromLogin(req.headers.authorization)
    createAppointment = {
        title: req.body.title,
        body: req.body.body,
        date: req.body.date,
        userid: userId
    }
    Appointment.create(createAppointment, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
});

router.route("/delete/:id").delete(checkIfAuthenticated, (req, res) => {
    const userId = getLoggedInUserIdFromLogin(req.headers.authorization)
    const id = req.params.id.split("=")[1];
    Appointment.deleteOne({ '_id': id, 'userid': userId }, (error, data) => {
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
});

router.route("/update").put(checkIfAuthenticated, (req, res) => {
    const userId = getLoggedInUserIdFromLogin(req.headers.authorization)
    createAppointment = {
        title: req.body.title,
        body: req.body.body,
        date: req.body.date,
        userid: userId
    }
    Appointment.updateOne({"_id": req.body._id, 'userid': userId}, createAppointment, (error, data) => {
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
});

router.route("/getById/:id").get(checkIfAuthenticated, (req, res) => {
    const userId = getLoggedInUserIdFromLogin(req.headers.authorization)
    const id = req.params.id.split("=")[1];
    Appointment.findById({'_id': id, 'userid': userId}, (error, data) => {
        if (error) {
            return error;
        } else {
            res.json(data);
        }
    })
});

module.exports = router