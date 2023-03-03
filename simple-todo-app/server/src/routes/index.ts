import { Router } from 'express'
import { addNewTask,getAllTasks } from '../controller/task';
import { loginUser, registerUser } from '../controller/user';
import { getAllUsers } from '../service/user.service';

const router = Router();
const express = require('express');

router.use(express.json());

router.post('/tasks', addNewTask);
router.get('/tasks/:username', getAllTasks);
router.post('/users', registerUser);
router.get('/users', getAllUsers);
router.post('/login', loginUser);

export default router;