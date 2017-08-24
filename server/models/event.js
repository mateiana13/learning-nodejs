const mongoose = require('mongoose');

var Event = mongoose.model("Event", {
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    nbrOfGuests: {
        type: Number,
        default: 5,
        trim: true,
        minlength: 1
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
});

module.exports = {
    Event
};