const mongoose = require('mongoose');


    const Appointment = mongoose.Schema(
      {
        title: String,
        body: String,
        date: Date,
        userid: String
        },
      { timestamps: true },
        {collection: 'appointment'}
      );
    
    module.exports = mongoose.model("appointment", Appointment);