const {
    MongoClient,
    ObjectID
} = require('mongodb');

var dbUrl = "mongodb://localhost:27017/Todos";

MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        return console.log("Unable to connect to mongodb server.");
    }

    console.log("Connected to the mongodb server.");

    //deleteOne
    // db.collection('Todos').deleteOne({test: "eat lunch"}).then((docs) => {
    // 	console.log(docs);
    // })

    //deleteMany
    // db.collection('Todos').deleteMany({test: "eat lunch"}).then((docs) => {
    // 	console.log(docs);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({test: "eat lunch"}).then((result) => {
    // 	console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({_id: new ObjectID("599bdf0846498b2d22b603fd")}).then((result) => {
    // 	console.log(JSON.stringify(result, undefined, 2));
    // }, (err) => {
    // 	console.log(err);
    // });

    // db.collection("Users").deleteMany({
    //     name: "cristi"
    // }).then((docs) => {
    //     console.log(docs);
    // }).catch((err) => {
    //     console.log(err);
    // });

    db.collection("Users").deleteMany({
        "age": {
            "$gte": 24,
            "$lte": 27
        }
    }).then((docs) => { //agregare
        console.log(docs);
    }).catch((err) => {
        console.log(err);
    });


});