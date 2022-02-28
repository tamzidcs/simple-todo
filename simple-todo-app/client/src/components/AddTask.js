import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
const axios = require('axios')

export function AddTask(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    const addTask = (event) => {
        event.preventDefault()
        if (title && description) {
            axios.post('http://localhost:3005/Tasks', { title: title, description: description, username: localStorage.getItem('username') })
                .then(resp => {
                    console.log(resp.data)
                    props.taskListUpdate()
                })
        }

    }

    return (
        <div style={styles.container}>
            <form onSubmit={addTask}>
                <label style={styles.titleLabel}>Title</label>
                <input style={styles.titleTextField} type='text' value={title} onChange={e => setTitle(e.target.value)} />
                <label style={styles.descriptionLabel}>Desciption</label>
                <textarea style={styles.descriptionTextField} type='textarea' row='5' onChange={e => setDescription(e.target.value)} />
                <div style={styles.addButtonDiv}><input style={styles.addButton} type='submit' value='Add' /></div>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: 'inline-block',
        marginLeft: '40vw',
        padding: '1vw',
        width: '20vw',
        color: 'black',
        backgroundColor: 'lightblue'
    },
    titleTextField: {
        width: '18vw'
    },
    descriptionTextField: {
        width: '18vw'
    },
    titleLabel: {
        width: '10vw'
    },
    descriptionLabel: {
        width: '10vw'
    },
    addButton: {
        marginTop: '2vh',
        padding: '1vh',
        width: '6vw'
    },
    addButtonDiv: {
        width: '15vw',
        display: 'flex',
        justifyContent: 'right'
    }

}