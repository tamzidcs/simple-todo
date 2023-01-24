import { Header } from "../header/header";
import { useEffect, useState } from "react";
import { AddTask } from "../addTask/addTask";
import { useNavigate } from 'react-router-dom';
import React from 'react';
const axios = require('axios');

export const ToDoList= () => {
    const [data, setData] = useState<any[]>([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [count, setCount] = useState(0)
    const [userNameList, setUserNameList] = useState<any[]>([])
    const [shareUserName, setShareUserName] = useState('')
    const navigate = useNavigate();
    const [taskListUpdated,setTaskListUpdated] = useState(false)
    const getTasks=(url: string,item: string)=> {
        if(localStorage.getItem(item)) {
            axios.get(url+ localStorage.getItem(item))
            .then((resp: any) => {
                setData(resp.data as any)
            })
        }
    }
    const taskListUpdate=()=>{
        setTaskListUpdated(true)
    }
    useEffect(() => {
        getTasks('http://localhost:3005/Tasks/','username');
        setTaskListUpdated(false)
        let res= axios.get('http://localhost:3005/Users')
            .then((resp: { data: any; }) => {
                setUserNameList(resp.data)
            })
    }, [taskListUpdated]);

    const taskDone = (url: string,taskId: string) => {
        let data = axios.put(url + taskId)
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data['msg'] == 'task updated')
                {
                    alert('Task Updated.')
                    getTasks('http://localhost:3005/Tasks/','username');
                }
            })
    }

    const taskShare = (url: string, taskId: any,userName: string) => {
        let data = axios.post(url,{taskId:taskId,username:userName})
            .then((resp: { data: { [x: string]: string; }; }) => {
                if (resp.data['msg'] == 'task shared')
                    alert('Task Shared with '+userName)
            })
    }
    return (
        <div style={styles.container}>
            <Header />
            <AddTask taskListUpdate={taskListUpdate}/>
            <div style={styles.todolist}>
                {data.map(task =>
                 (
                    <div key={task.id}>
                        <div style={styles.todos}>
                            <div style={styles.title}>{task.title}</div>
                            <div style={styles.description}>{task.description}</div>
                        </div>
                        <div style={styles.doneButton}>
                            <button onClick={() => taskDone('http://localhost:3005/Tasks/',task.id)}> Done</button>
                        </div>
                        <div>
                            <input list='userNameList' type='text' placeholder="select user" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setShareUserName(e.target.value)}/>
                            <datalist id='userNameList' >
                                {userNameList.map((val, indx) => (
                                    <option key={indx} >{val.username}</option>
                                ))}
                            </datalist>
                            <button onClick={() => taskShare('http://localhost:3005/Share',task.id,shareUserName)}> Share</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const styles = {
    todolist: {
        paddingTop: '10vh',
        display: 'inline-block',
        marginLeft: '40vw',
        width: '20vw',
    },
    container: {
        display: 'inline-block',
        width: '100vw',
        marginBottom:'15vh'

    },
    title: {
        paddingLeft:'0.5vw',
        color: 'black',
        backgroundColor: 'darkgray',
        width: '20vw',
        fontWeight: 'bold'
    },
    description: {
        color: 'black',
        width: '20vw'
    },
    todos: {
        paddingTop: '5vh',
        


    },
    doneButton:{
        marginLeft:'0vw',
        margin :'1vh'
    }

}