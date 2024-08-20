import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import { TodoList } from './components/pages/TodoList/TodoList';
import { Landing } from './components/pages/Landing/Landing';
import { Signup } from './components/pages/Signup/Signup';
import { Login } from './components/pages/Login/Login';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/toDoList" element={<TodoList />} />
        </Route>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
