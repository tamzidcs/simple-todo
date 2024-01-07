import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import { ToDoList } from './components/Todo/ToDoList';
import { Landing } from './components/Landing/Landing';
import { Signup } from './components/Signup/Signup';
import { Login } from './components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/toDoList" element={<ToDoList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
