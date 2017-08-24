const {
    MongoClient,
    ObjectID
} = require('mongodb');

const dbUrl = "mongodb://localhost:27017/Todos";

MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        console.log("Unable to connect to mongodb server.");
    }

    console.log("Connected to mongodb server");

    // db.collection('Todos').update({
    //     test: "go home"
    // }, {
    //     "$set": {
    //         "completed": true
    //     }
    // }).then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // });

    // db.collection("Todos").findOneAndUpdate({
    //     test: "eat dinner"
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((docs) => {
    //     console.log(docs)
    // });

    // db.collection("Users").updateMany({
    //     name: "ana"
    // }, {
    // 	$inc: {age: 5}
    // }, {
    // 	returnOriginal: false
    // }).then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((err) => {
    //     console.log(err);
    // });

    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("599befb71eda0f0a941b0a02")
    }, {
        $set: {
            name: "izabela"
        },
        $inc: {
            age: -10
        }
    }, {
        returnOriginal: false
    }).then((doc) => {
        console.log(JSON.stringify(doc));
    }).catch((err) => {
        console.log(err);
    });



});