import { Header } from "../header/header";
import { useEffect, useState } from "react";
import { AddTodo } from "../addTodo/addTodo";
import React from 'react';
import './toDoList.scss';
import { Axios, AxiosError } from "axios";
const axios = require('axios');
const url = {
    tasks: 'http://localhost:3005/todos/',
    users: 'http://localhost:3005/users/',
    share: 'http://localhost:3005/share/'
}

export const ToDoList = () => {
    const [data, setData] = useState<any[]>([])
    const [userNameList, setUserNameList] = useState<any[]>([])
    const [shareUserName, setShareUserName] = useState('')
    const [taskListUpdated, setTodoListUpdated] = useState(false);

    const getTodosByParam = (param: string) => {
        const localStorageItem = localStorage.getItem(param)
        if (localStorageItem) {
            const username = localStorageItem;
            axios.get(url.tasks + localStorageItem)
                .then((resp: any) => {
                    setData(resp.data as any)
                })
        }
    }

    const taskListUpdate = () => {
        setTodoListUpdated(true)
    }

    useEffect(() => {
        getTodosByParam('username');
        setTodoListUpdated(false)
        axios.get(url.users)
            .then((resp: { data: any; }) => {
                setUserNameList(resp.data)
            })
    }, [taskListUpdated]);

    const taskDone = (taskId: string) => {
        axios.put(url.tasks + taskId)
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data) {
                    alert('todo Updated.')
                    getTodosByParam('username');
                }
            }).catch((error: AxiosError) => {
                alert(error.message);
            })
    }

    const taskShare = (taskId: any, userName: string) => {
        axios.post(url.share, { taskId: taskId, username: userName })
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data)
                    alert('todo Shared with ' + userName)
            })
    }

    return (
        <div className='to-do-list-container'>
            <Header />
            <AddTodo taskListUpdate={taskListUpdate} />
            <div className='todolist'>
                {data.map(todo =>
                (
                    <div key={todo.id}>
                        <div className='todos'>
                            <div className='title'>{todo.title}</div>
                            <div className='description'>{todo.description}</div>
                        </div>
                        <div className='doneButton'>
                            <button onClick={() => taskDone(todo.id)}> Done</button>
                        </div>
                        <div>
                            <input list='userNameList' type='text' placeholder="select user" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShareUserName(e.target.value)} />
                            <datalist id='userNameList' >
                                {userNameList.map((val, indx) => (
                                    <option key={indx} >{val.username}</option>
                                ))}
                            </datalist>
                            <button onClick={() => taskShare(todo.id, shareUserName)}> Share</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}