
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ToDoList } from './components/todo/toDoList';
import {Landing} from './components/landing/landing'
import {Signup} from './components/signup/signup'
import { Login } from './components/login/login';

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
