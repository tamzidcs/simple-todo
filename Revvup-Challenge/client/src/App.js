
import './App.css';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ToDoList } from './components/ToDoList';

import {Landing} from './components/Landing'
import {Signup} from './components/Signup'
import { Login } from './components/Login';

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
