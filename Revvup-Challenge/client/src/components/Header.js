
import { useNavigate } from 'react-router-dom';
export  function Header(){
    const navigate = useNavigate();
    const signout =()=>{
        localStorage.setItem('username','')
        navigate('/login')
    }
    return(
        <div style={styles.container}>
            <div style={styles.username}>{localStorage.getItem('username')}</div>
            <div style={styles.signout}><button onClick={signout}>Signout</button></div>
        </div>
    )
}

const styles={
    container:{
        width:'100vw',
        height:'8vh',
        color:'black',
        backgroundColor:'lightgreen'
    },
    signout:{
        display:'flex',
        justifyContent:'right',
        marginRight:'10vw'
    },
    username:{
        display:'flex',
        justifyContent:'right',
        marginRight:'10vw',
        marginBottom:'0.5vh',
        fontWeight:'bold'
        
    }
}