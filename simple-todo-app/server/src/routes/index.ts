import { Router } from 'express'
import { addNewTask,getAllTasks } from '../controller/task';


const router = Router()
const express = require('express');

router.use(express.json());
router.post('/tasks', addNewTask);
router.get('/tasks', getAllTasks);

export default router;