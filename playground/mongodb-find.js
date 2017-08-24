const {
    MongoClient,
    ObjectID
} = require('mongodb');

const dbUrl = "mongodb://localhost:27017/Todos";

MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server.');
    }

    console.log("Connected to mongodb server.");

    db.collection('Todos').find({
        completed: false
    }).toArray().then((docs) => {
        console.log('Todos:');
        console.log(JSON.stringify(docs, undefined, 2))
    }).catch((err) => {
        console.log('Unable to find todos', err);
    });

    db.collection('Todos').find({
        _id: new ObjectID("599c165246498b2d22b61125")
    }).toArray().then((docs) => {
        console.log('Todos:');
        console.log(JSON.stringify(docs, undefined, 2))
    }).catch((err) => {
        console.log('Unable to find todos', err);
    });

    db.collection('Todos').count().then((count) => {
    	console.log(`Todos count: ${count}`);
    }).catch((err) => {
    	console.log(err);
    });

    db.collection('Users').find({name: "ana"}).toArray().then((docs) => {
	console.log(`All the docs with the name "ana" are: `); console.log(JSON.stringify(docs, undefined, 2));
    }).catch((err) => {
    	console.log(err);
    });


    db.collection('Users').find({
        "$and": [{
            name: "maria"
        }, {
            "age": {
                "$gte": 30,
                "$lte": 50
            }
        }]
    }).toArray().then((docs) => {
    	console.log(JSON.stringify(docs, undefined, 2));
    }).catch((err) => {
    	console.log(err);
    });
    
    db.close();
});