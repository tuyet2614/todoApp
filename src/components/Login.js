import './Login.css'
import axios from 'axios'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [cookies, setCookie] = useCookies(['user']);

  const handle = () => {
    setCookie('Name', username, { path: '/' })
    setCookie('Password', password, { path: '/' })
  }
  let navigate = useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://api-nodejs-todolist.herokuapp.com/user/login`, {
      "email": username,
      "password": password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate('/', { replace: true })
      })
      .catch(error => console.log(error));


  }

  return (
    <div className="login-form">
      <div className="title">Sign In</div>
      <div className="form">
        <form onSubmit={handleLoginSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="name" onChange={e => setUserName(e.target.value)} />

          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" onChange={e => setPassword(e.target.value)} />

          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
          <div className='check'>
            <span>Don't have an account </span>
            <Link to='/signup'>Register now</Link>
          </div>
        </form>
      </div>
    </div>

  )
}


export default Login