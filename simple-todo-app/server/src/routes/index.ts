import { Router } from 'express'
import { addNewTask,getAllTasks } from '../controller/task';
import { loginUser, registerUser } from '../controller/user';

const router = Router();
const express = require('express');

router.use(express.json());

router.post('/tasks', addNewTask);
router.get('/tasks', getAllTasks);
router.post('/users', registerUser);
router.post('/login', loginUser);

export default router;