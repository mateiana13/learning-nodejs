const config = require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');


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
mongoose.set("debug", true);

var app = express(), nodalytics = require('nodalytics');
const port = process.env.PORT;
app.use(nodalytics('UA-103024478-4'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json()); //middleware ca sa trimit content sub forma de json

app.use(bodyParser.json({
	'accept': 'application.json',
    'content-type': 'application/json'
}));

app.all('*', function (req, res) {
    res.send('Hello!');
});

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
        if (!doc) {
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
        if (!user) {
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
        if (!event) {
            return res.status(404).send();
        }

        res.send({
            event
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    console.log('122332234')
    console.log(req.body)
        // console.log("111111111111", id)

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        });
    }).catch((err) => {
        res.status(400).send(err);
    });

});


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = lodash.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (lodash.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: {text: req.body.text, completed: req.body.completed}}, { upsert: true, new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    return res.status(400).send();
  })
});

app.put('/todos/:id', (req, res) =>{

    Todo.findOneAndUpdate({_id: req.params._id}, {
        $set: {text:req.body.text}
    }, {upsert: true, new:true}, (err, newTodo) => {
        if(err) {
            console.log(err)
        }
        console.log(newTodo);
        res.json(newTodo);
    });
});



app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

module.exports = {
    app
};