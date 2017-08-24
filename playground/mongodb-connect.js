// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// const ObjectID = require('mongodb').ObjectID;


// var obj = new ObjectID();
// console.log(obj);

const dbUrl = "mongodb://localhost:27017/Todos";

var user = { name: "alina", age:25};
var {name, age} = user; 	//destructure the user object. creates a new variable (name) which contains the value of that field in the user object
console.log(name, age);



MongoClient.connect(dbUrl, (err, db) => {


    if (err) {
        return console.log('Unable to connect to mongodb server.');
    }
    console.log('Connected to mongodb server.');

    // db.collection('Todos').insertMany([{
    //     text: "something to do",
    //     completed: false

    // }, {
    //     text: "learn node js",
    //     completed: false
    // }, {
    //     text: "get a better job",
    //     completed: false
    // }], (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(`number of documents in the Todos collection is: ${result.ops.length}`);

    // });

    // db.collection('Users').insertMany([{
    //     name: "ana",
    //     age: 25,
    //     location: "oslo"
    // }, {
    //     name: "cristi",
    //     age: 22,
    //     location: "amsterdan"
    // }, {
    //     name: "laur",
    //     age: 26,
    //     location: "bucuresti"
    // }], (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert into Users', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    var todos = db.collection('Todos');     //colectia cu care lucrez
    var users = db.collection('Users');
    

    getIdFromDB(todos, "599bdf0846498b2d22b603fd").then((_id) => {

    		getDateTime(_id).then((dateInfo) => {
            console.log(dateInfo[0] + ", " + dateInfo[1]);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
    	console.log(err);
    });

    getIdFromDB(users, "599be995d315e907089e6058").then((_id) => {

    		getDateTime(_id).then((dateInfo) => {
            console.log(dateInfo[0] + ", " + dateInfo[1]);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
    	console.log(err);
    });


    db.close();
});


var getIdFromDB = (dbName, idString) => {
    let id = new ObjectID(idString);
    return new Promise((resolve, reject) => {
        
        dbName.findOne({
            _id: id
        }, (err, result) => {
        	if(err) {
        		resolve(err);
        	}
        	resolve(result._id);
        });
    }).catch((err) => {
        console.log(err);
    })
}

var getDateTime = (_id) => {
    return new Promise((resolve, reject) => {
        let date = _id.getTimestamp();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let day = date.getDate();
        let fullDate = year + "/" + month + "/" + day;
        let time = _id.getTimestamp().toString().split(" ")[4];
        resolve([fullDate, time]);
    }).catch((err) => {
        console.log(err);
    })
}
