import logo from './logo.svg';
import './App.css';
import ListTodo from './components/listTodo';
import { useEffect, useState } from "react";
import Login from './components/Login';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import SignUp from './components/signUp';

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token', token)
    if (!token) {

      navigate('/login', { replace: true });
    } else {
      navigate('/todo', { replace: true });
    }
  }, []);

  return null;
};

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            <Route path="/todo"
              element={<ListTodo


              />} />
            <Route path="/user" element={<Splash />}>
              <Route path=":id" element={<Splash />} />
            </Route>
          </Routes>


        </Router>


      </header>
    </div>
  );
}

export default App;
