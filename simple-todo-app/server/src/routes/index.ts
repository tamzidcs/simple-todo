import { Router } from 'express'
import { addNewTodo,getAllTodosByUsername } from '../controller/todo.controller';
import { getAllUsers, loginUser, registerUser } from '../controller/user.controller';
import { updateTodoStatus } from '../controller/todo.controller';
import { shareTodo } from '../controller/todo.controller';
// import { getAllUsers } from '../controller/user';

const router = Router();
const express = require('express');

router.use(express.json());

router.post('/todos', addNewTodo);
router.post('/share', shareTodo);
router.put('/todos/:todoId', updateTodoStatus);
router.get('/todos/:username', getAllTodosByUsername);
router.post('/users', registerUser);
router.get('/users', getAllUsers);
router.post('/login', loginUser);

export default router;