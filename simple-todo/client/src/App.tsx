import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Landing } from './components/pages/Landing/Landing';
import { Signup } from './components/pages/Signup/Signup';
import { Login } from './components/pages/Login/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import { store } from './store/store';
import Home from './components/pages/Home/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;
