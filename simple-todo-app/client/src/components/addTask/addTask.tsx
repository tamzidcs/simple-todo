import React from 'react';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './addTask.scss';

const axios = require('axios')
const url = {
    addTask: 'http://localhost:3005/tasks'
} 

export const  AddTask= (props: { taskListUpdate: () => void; }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const addTask = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (title && description) {
            axios.post(url.addTask, { title: title, description: description, username: localStorage.getItem('username') })
                .then((resp: { data: any; }) => {
                    props.taskListUpdate()
                })
        }
    }

    return (
        <div className='add-task-container'>
            <form onSubmit={addTask}>
                <label className='titleLabel'>Title</label>
                <input className='titleTextField' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                <label className='descriptionLabel'>Desciption</label>
                <textarea className='descriptionTextField'  onChange={e => setDescription(e.target.value)} />
                <div className='addButtonDiv'><input className='addButton' type='submit' value='Add' /></div>
            </form>
        </div>
    )
}