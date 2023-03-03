import { Header } from "../header/header";
import { useEffect, useState } from "react";
import { AddTask } from "../addTask/addTask";
import React from 'react';
import './toDoList.scss';
import { Axios, AxiosError } from "axios";
const axios = require('axios');
const url = {
    tasks: 'http://localhost:3005/tasks/',
    users: 'http://localhost:3005/users/',
    share: 'http://localhost:3005/share/'
}

export const ToDoList = () => {
    const [data, setData] = useState<any[]>([])
    const [userNameList, setUserNameList] = useState<any[]>([])
    const [shareUserName, setShareUserName] = useState('')
    const [taskListUpdated, setTaskListUpdated] = useState(false);

    const getTasks = (item: string) => {
        if (localStorage.getItem(item)) {
            const username =  localStorage.getItem(item);
            axios.get(url.tasks + username)
                .then((resp: any) => {
                    setData(resp.data as any)
                })
        }
    }

    const taskListUpdate = () => {
        setTaskListUpdated(true)
    }

    useEffect(() => {
        getTasks('username');
        setTaskListUpdated(false)
        // axios.get(url.users)
        //     .then((resp: { data: any; }) => {
        //         setUserNameList(resp.data)
        //     })
    }, [taskListUpdated]);

    const taskDone = (taskId: string) => {
        axios.put(url.tasks + taskId)
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data) {
                    alert('Task Updated.')
                    getTasks('username');
                }
            }).catch((error: AxiosError)=>{
                alert(error.message);
            })
    }

    const taskShare = (taskId: any, userName: string) => {
        axios.post(url.tasks, { taskId: taskId, username: userName })
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data['msg'] === 'task shared')
                    alert('Task Shared with ' + userName)
            })
    }

    return (
        <div className='to-do-list-container'>
            <Header />
            <AddTask taskListUpdate={taskListUpdate} />
            <div className='todolist'>
                {data.map(task =>
                (
                    <div key={task.id}>
                        <div className='todos'>
                            <div className='title'>{task.title}</div>
                            <div className='description'>{task.description}</div>
                        </div>
                        <div className='doneButton'>
                            <button onClick={() => taskDone(task.id)}> Done</button>
                        </div>
                        <div>
                            <input list='userNameList' type='text' placeholder="select user" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShareUserName(e.target.value)} />
                            <datalist id='userNameList' >
                                {userNameList.map((val, indx) => (
                                    <option key={indx} >{val.username}</option>
                                ))}
                            </datalist>
                            <button onClick={() => taskShare(task.id, shareUserName)}> Share</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}