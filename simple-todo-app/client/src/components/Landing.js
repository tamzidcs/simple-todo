import { Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
const axios = require('axios')
export function Landing() {
    if (1) {
      return <Navigate to="/login" />
    }
  
    
    return (
      <div>
        dashboard goes here
      </div>
    );
}

const styles = {
    container: {
        display: 'inline-block'
    },
    title: {
        color: 'green',
        backgroundColor: 'gray',
        width: '20vw',
        fontWeight: 'bold'
    },
    desciption: {
        color: 'blue',
        width: '20vw'
    }

}