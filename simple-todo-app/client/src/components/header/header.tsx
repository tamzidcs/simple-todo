import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss';

export const  Header = () => {
    const navigate = useNavigate();
    const signout = () => {
        localStorage.setItem('username','')
        navigate('/login')
    }
    return(
        <div className='header-container'>
            <div className='username'>{localStorage.getItem('username')}</div>
            <div className='signout'><button onClick={signout}>Signout</button></div>
        </div>
    );
};

// const styles={
//     container:{
//         width:'100vw',
//         height:'8vh',
//         color:'black',
//         backgroundColor:'lightgreen'
//     },
//     signout:{
//         display:'flex',
//         justifyContent:'right',
//         marginRight:'10vw'
//     },
//     username:{
//         display:'flex',
//         justifyContent:'right',
//         marginRight:'10vw',
//         marginBottom:'0.5vh',
//         fontWeight:'bold'
        
//     }
// }