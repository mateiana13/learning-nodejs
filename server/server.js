const express = require('express');
const bodyParser = require('body-parser');

const {
    ObjectID
} = require('mongodb');

const {
    mongoose
} = require('./db/mongoose.js');
const {
    Todo
} = require('./models/todo.js');
const {
    User
} = require('./models/users.js');
const {
    Event
} = require('./models/event.js');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); //middleware ca sa trimit content sub forma de json

app.post('/todos', (request, response) => { //create a new todo
    var todo = new Todo({
        text: request.body.text
    });

    todo.save().then((doc) => {
        response.send(doc);
    }).catch((err) => {
        response.status(400).send(err);
    });
});


app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({
            todos
        });
    }).catch((err) => {
        response.status(400).send(err);
    });
});

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
        console.log(`Id: ${id} is not valid`);
    }
    Todo.findById({
        _id: ObjectID(id)
    }).then((doc) => {
        if(!doc) {
            return res.status(404).send();
        }

        console.log(`Todo with id: ${id} is: ${doc}`);
        response.send(doc);
    }).catch((err) => {
        response.send(err);
    });
});


app.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    });
    user.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({
            users
        })
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/users/:userId', (req, res) => {
    let id = req.params.userId;
    if (!ObjectID.isValid(id)) {
       return res.status(404).send();
    }
    User.findById({
        _id: id
    }).then((user) => {
        if(!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.post('/events', (request, response) => {
    let event = new Event({
        name: request.body.name,
        location: request.body.location,
        nbrOfGuests: request.body.nbrOfGuests
    });

    event.save().then((event) => {
        response.send(event);
    }).catch((err) => {
        response.status(400).send(err);
    });
});

app.get('/events', (req, res) => {
    Event.find().then((events) => {
        if (!events) {
            res.status(400).send();
        }
        res.send(events);
    });
});

app.get('/events/:eventId', (req, res) => {
    let id = req.params.eventId;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send(`Id ${id} is invalid.`);
    }
    Event.findById({
        _id: id
    }).then((event) => {
        if(!event) {
            return res.status(404).send();
        }

        res.send({event});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

module.exports = {
    app
};