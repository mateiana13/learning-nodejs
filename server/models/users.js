const mongoose = require('mongoose');

var User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
});

module.exports = {User};