import { Router } from 'express'
import { addNewTodo,getAllTodosByUsername } from '../controller/todo.controller.js'
import { getAllUsers, loginUser, registerUser } from '../controller/user.controller.js'
import { updateTodo } from '../controller/todo.controller.js'
import { shareTodo } from '../controller/todo.controller.js'
import express from 'express';

const router = Router();

router.use(express.json());

router.post('/todos', addNewTodo);
router.post('/share', shareTodo);
router.patch('/todos/:todoId', updateTodo);
router.get('/todos/:username', getAllTodosByUsername);
router.post('/users', registerUser);
router.get('/users', getAllUsers);
router.post('/login', loginUser);

export default router;