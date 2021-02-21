const Todo = require('../models/Todo');
const mongoose = require('mongoose');

/** POST: Create a new todo */
createNewTodo = async (req, res, next) => {
    const { userId, todo } = req.body;
    if (userId && todo) {
        const newTodo = {
            _id: mongoose.Types.ObjectId(),
            todo: todo
        }
        Todo.findOne({ userId: userId }, (err, userTodo) => {
            if (err) {
                console.log("ERROR in the FINDONE method in the createNewTodo");
            }
            if (userTodo) {
                userTodo.todoList.push(newTodo);
                userTodo.save();
                res.json(newTodo);
            } else {
                const newTodoList = {
                    userId: userId,
                    todoList: newTodo
                };
                Todo.create(newTodoList, (err, result) => {
                    if (err) {
                        console.log("ERROR in the CREATE method in the createNewTodo");
                    }
                    res.json(newTodo);
                });
            }
        })
    } else {
        var error = new Error('Required feilds are missing!');
        error.status = 422; /** Unprocessable entity */
        next(error);
    }

}


/** GET: all conversation in the DB */
getUserTodo = (req, res, next) => {
    try {
        const { userID } = req.params;
        if (userID) {
            Todo.findOne({ userId: userID }).exec((err, result) => {
                if (err) {
                    console.log("ERROR in the FINDONE method in the createNewTodo");
                }
                // Removes all closed todo from the db and save the new filtered array
                if (result) {
                    res.json(result);
                } else {
                    var error = new Error('List for user not found!!!');
                    error.status = 422; /** Unprocessable entity */
                    next(error);
                }
            });

        } else {
            var error = new Error('Required feilds are missing!');
            error.status = 422; /** Unprocessable entity */
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

closeTodo = (req, res, next) => {
    try {
        const { userId, todoId } = req.body;
        if (userId && todoId) {
            Todo.findOne({ userId: userId }).exec((err, result) => {
                if (err) {
                    console.log("ERROR in the FINDONE method in the createNewTodo");
                }
                // Removes all closed todo from the db and save the new filtered array
                if (result) {
                    for (var todo of result.todoList) {
                        if (todo._id == todoId) {
                            todo.remove();
                        }
                    }
                    result.save();
                    res.json(result);
                } else {
                    var error = new Error('List for user not found!!!');
                    error.status = 422; /** Unprocessable entity */
                    next(error);
                }
            });

        } else {
            var error = new Error('Required feilds are missing!');
            error.status = 422; /** Unprocessable entity */
            next(error);
        }
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createNewTodo,
    getUserTodo,
    closeTodo
}