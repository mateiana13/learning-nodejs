const {
    ObjectID
} = require('mongodb');

const {
    mongoose
} = require('./../server/db/mongoose.js');
const {
    Todo
} = require('./../server/models/todo.js');
const {
    User
} = require('./../server/models/users.js');
const {
    Event
} = require('./../server/models/event.js');

var id = "599d78485c1ce92e7c720621";

// if(!ObjectID.isValid(id)) {
// 	console.log('id not valid');
// }

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove({_id: "599ec50dcb68f378b7e3b329"}).then((result) => {
// 	if(!ObjectID.isValid(_id)) {
// 		return console.log(`the id: ${id} is not valid`);
// 	}
// 	console.log(result);
// }).catch((err) => {
// 	return console.log(err);
// });

// Todo.findByIdAndRemove('599ec443cb68f378b7e3b2cc').then((result) => {
// 	if(!ObjectID.isValid(_id)) {
// 		return console.log(`the id: ${id} is not valid`);
// 	}
// 	console.log(result);
// }).catch((err) => {
// 	return console.log(err);
// });

Todo.findByIdAndUpdate('599edeb9cb68f378b7e3bba7', {
    $set: {
        text: 'sdsdsdsd',
        completed: true
    }
}, {
    new: true
}).then((todo) => {
    if (!todo) {
        return 'obj not found';
    }
    console.log(todo)
}).catch((err) => {
    console.log(err);
})