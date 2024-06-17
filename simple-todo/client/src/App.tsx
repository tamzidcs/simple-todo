import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import { TodoList } from './components/Pages/TodoList/TodoList';
import Landing from './components/Pages/Landing/Landing';
import { Signup } from './components/Pages/Signup/Signup';
import { Login } from './components/Pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/toDoList" element={<TodoList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
