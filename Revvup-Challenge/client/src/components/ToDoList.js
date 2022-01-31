import { Header } from "./Header";
import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";
import { useNavigate } from 'react-router-dom';
const axios = require('axios')



export function ToDoList() {
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [count, setCount] = useState(0)
    const [userNameList, setUserNameList] = useState([])
    const [shareUserName, setShareUserName] = useState([])
    const navigate = useNavigate();
    const [taskListUpdated,setTaskListUpdated] = useState(false)
    const getTasks=()=>{
        axios.get('http://localhost:3005/Tasks/' + localStorage.getItem('username'))
        .then(resp => {
            console.log(resp.data)
            setData(resp.data)
        })
    }
    const taskListUpdate=()=>{
        setTaskListUpdated(true)
    }
    useEffect(() => {
        getTasks()
        setTaskListUpdated(false)
        let res= axios.get('http://localhost:3005/Users')
            .then(resp => {
                console.log(resp.data)
                setUserNameList(resp.data)

            })
    }, [taskListUpdated]);
    const taskDone = (taskId) => {
        let data = axios.put('http://localhost:3005/Tasks/' + taskId)
            .then(resp => {
                if (resp.data['msg'] == 'task updated')
                {
                    alert('Task Updated.')
                    getTasks()
                }


            })
    }
    const taskShare = (taskId,userName) => {
        let data = axios.post('http://localhost:3005/Share',{taskId:taskId,username:userName})
            .then(resp => {
                if (resp.data['msg'] == 'task shared')
                    alert('Task Shared with '+userName)
            })
    }
    return (

        <div style={styles.container}>
            <Header />
            <AddTask taskListUpdate={taskListUpdate}/>
            <div style={styles.todolist}>
                {data.map(task => (
                    <div key={task.id}>
                        <div style={styles.todos}>
                            <div style={styles.title}>{task.title}</div>
                            <div style={styles.description}>{task.description}</div>
                        </div>
                        <div style={styles.doneButton}>
                            <button onClick={() => taskDone(task.id)}> Done</button>
                        </div>
                        <div>
                            <input list='userNameList' type='text' placeholder="select user" onChange={(e)=>setShareUserName(e.target.value)}/>
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