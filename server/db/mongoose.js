const mongoose = require('mongoose');

const dbUrl = "mongodb://localhost:27017/Todos";

mongoose.Promise = global.Promise;
// Using `mongoose.connect`...
var promise = mongoose.connect(process.env.MONGODB_URI || dbUrl, {
    useMongoClient: true,
});

module.exports = {
    mongoose
};