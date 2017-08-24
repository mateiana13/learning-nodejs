const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {
    app
} = require('./../server.js');
const {
    Todo
} = require('./../models/todo.js');


const todos = [{
	_id: new ObjectID(),
    text: "first todo"
}, {
	_id: new ObjectID(),
    text: "second todo"
}];

//intai sterge baza de date, apoi insereaza si verifica daca are obiectul introdus in db
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST/todos', () => {
    it('should create a new todo', (done) => {
        var text = "test todo text";

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });

    it('should not create todo with invalid body date', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }, err => {
                    done(err);
                });
            });
    });

});

describe('POST /todos', () => {
    it('should get all todos', (done) => {
    	request(app)
    		.get('/todos')
    		.expect(200)
    		.expect((res) => {
    			expect(res.body.todos.length).toBe(2);
    		})
    		.end(done);
    });
});

describe('GET /todos/:id', () => {
	it('should get the todo with the specified id', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(todos[0].text);
			})
			.end(done);

	});

	it('should return a 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
			.get(`/todos/590e7a57b6773e335470d86b`)
			.expect(200)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.get('/todos/123abc')
			.expect(404)
			.end(done);
	});
});
