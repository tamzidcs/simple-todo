import { Header } from "../header/header";
import { useEffect, useState } from "react";
import { AddTask } from "../addTask/addTask";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './toDoList.scss';
const axios = require('axios');
const url = {
    tasks: 'http://localhost:3005/tasks/',
    users: 'http://localhost:3005/users/',
    share: 'http://localhost:3005/share/'
}

export const ToDoList = () => {
    const [data, setData] = useState<any[]>([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [count, setCount] = useState(0)
    const [userNameList, setUserNameList] = useState<any[]>([])
    const [shareUserName, setShareUserName] = useState('')
    const navigate = useNavigate();
    const [taskListUpdated,setTaskListUpdated] = useState(false);
    
    const getTasks=(item: string)=> {
        if(localStorage.getItem(item)) {
            axios.get(url.tasks + localStorage.getItem(item))
            .then((resp: any) => {
                setData(resp.data as any)
            })
        }
    }
    
    const taskListUpdate=()=>{
        setTaskListUpdated(true)
    }

    useEffect(() => {
        getTasks('username');
        setTaskListUpdated(false)
        let res = axios.get()
            .then((resp: { data: any; }) => {
                setUserNameList(resp.data)
            })
    }, [taskListUpdated]);

    const taskDone = (taskId: string) => {
        let data = axios.put(url.tasks + taskId)
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data['msg'] === 'task updated')
                {
                    alert('Task Updated.')
                    getTasks('username');
                }
            })
    }

    const taskShare = (taskId: any,userName: string) => {
        let data = axios.post(url.tasks,{taskId:taskId,username:userName})
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data['msg'] === 'task shared')
                    alert('Task Shared with ' + userName)
            })
    }

    return (
        <div className='to-do-list-container'>
            <Header />
            <AddTask taskListUpdate={taskListUpdate}/>
            <div className='todolist'>
                {data.map(task =>
                 (
                    <div key={task.id}>
                        <div  className='todos'>
                            <div className='title'>{task.title}</div>
                            <div className='description'>{task.description}</div>
                        </div>
                        <div className='doneButton'>
                            <button onClick={() => taskDone(task.id)}> Done</button>
                        </div>
                        <div>
                            <input list='userNameList' type='text' placeholder="select user" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setShareUserName(e.target.value)}/>
                            <datalist id='userNameList' >
                                {userNameList.map((val, indx) => (
                                    <option key={indx} >{val.username}</option>
                                ))}
                            </datalist>
                            <button onClick={() => taskShare(task.id,shareUserName)}> Share</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}