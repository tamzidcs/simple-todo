import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing from './components/pages/Landing/Landing';
import { Signup } from './components/pages/Signup/Signup';
import { Login } from './components/pages/Login/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import { store } from './store/store';
import Home from './components/pages/Home/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/toDoList" element={<Home />} />
          </Route>
          <Route index element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
