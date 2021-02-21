'use strict';


var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        trim: true,
    }
});
var TodoListSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    todoList:{
        type: [TodoSchema],
        required: true,
        trim: true,
    }
});


var Todo = mongoose.model('Todo', TodoListSchema);

module.exports = Todo;