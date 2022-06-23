const mongoose = require('mongoose');


    const User = mongoose.Schema(
        {
            name: String,
            email: String,
            address: String,
            password: String
        },
      { timestamps: true },
        {collection: 'user'}
      );
    
    module.exports = mongoose.model("user", User);
    