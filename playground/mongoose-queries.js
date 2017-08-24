const {ObjectID} = require('mongodb'); 

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/users.js');
const {Event} = require('./../server/models/event.js');

var id = "599d78485c1ce92e7c720621";

// if(!ObjectID.isValid(id)) {
// 	console.log('id not valid');
// }

Todo.find({
	_id: id
}).then((todos) => {
	console.log(`Todos array: ${todos}`);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log(`Todo is: ${todo}`);
}).catch((err) => {
	console.log(err);
});

Todo.findById(id).then((todo) => {
	console.log(`Todo with id: ${id} is: `, JSON.stringify(todo, undefined, 2));
}).catch((err) => {
	console.log(err);
});

let userId = "599d358b13e3623054ec9ae2";

User.findById(userId).then((userObj) => {
	if(!userObj) {
		console.log(`user with the id: ${userId} does not exist.`);
	}
	console.log(`User is: ${userObj}`);
}).catch((err) => {
	console.log(err);
});

