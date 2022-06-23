const express = require("express");
const expressJwt = require('express-jwt');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbms/index");
const app = express();
const registrationRoute = require("./routes/registration.routes")
const appointmentRoute = require("./routes/appointment.routes");
const authRouter = require("./routes/auth.router");
const PORT = process.env.PORT || 8080;



app.use(cors());
app.use(bodyParser.json());



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

    app.use('/api/user', registrationRoute);
    app.use('/api/appointment', appointmentRoute);
    app.use('/api/auth', authRouter);
    app.use(expressJwt({
      secret: 'appointment-shared-secret',
      algorithms: ['sha1', 'RS256', 'HS256']
    }).unless({
      path: [
        { url: '/api/auth', methods: ['POST']},
        { url: '/api/user', methods: ['POST']}
      ]
    }));

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


