import { Router } from 'express'
import { addNewTask,getAllTasksByUsername } from '../controller/task';
import { loginUser, registerUser } from '../controller/user';
import { getAllUsers } from '../service/user.service';

const router = Router();
const express = require('express');

router.use(express.json());

router.post('/tasks', addNewTask);
router.get('/tasks/:username', getAllTasksByUsername);
router.post('/users', registerUser);
router.get('/users', getAllUsers);
router.post('/login', loginUser);

export default router;