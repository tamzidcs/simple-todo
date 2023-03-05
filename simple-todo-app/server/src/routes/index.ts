import { Router } from 'express'
import { addNewTask,getAllTasksByUsername } from '../controller/task.controller';
import { getAllUsers, loginUser, registerUser } from '../controller/user.controller';
import { updateTaskStatus } from '../controller/task.controller';
import { shareTask } from '../controller/task.controller';
// import { getAllUsers } from '../controller/user';

const router = Router();
const express = require('express');

router.use(express.json());

router.post('/tasks', addNewTask);
router.post('/share', shareTask);
router.put('/tasks/:taskId', updateTaskStatus);
router.get('/tasks/:username', getAllTasksByUsername);
router.post('/users', registerUser);
router.get('/users', getAllUsers);
router.post('/login', loginUser);

export default router;