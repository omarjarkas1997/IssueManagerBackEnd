const router = require('express').Router();
const todoController = require('../../controllers/todoControllers');
const { route } = require('../authRoutes/authRoutes');





/** Create new User */
router.post('/create-new', todoController.createNewTodo);


/** Get user todo list */
router.get('/:userID', todoController.getUserTodo);



/** Get user todo list */
router.put('/close', todoController.closeTodo);

module.exports = router;