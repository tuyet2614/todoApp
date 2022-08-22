import { useState } from 'react';
import './Signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  let navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);

  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    axios.post(`https://api-nodejs-todolist.herokuapp.com/user/register`, {
      name: name,
      email: email,
      password: password, 
      confPassword: confPassword
    })
      .then(res => {
        navigate('/login', {replace: true})
        console.log(res);
        console.log(res.data);
        
      })
      .catch(error => console.log(error));
      
      
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  
  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  }
 
  
  return (
    <div className="App">
      <header className="App-header">
        <form className='SignUp_form' onSubmit={(e) => { handleSubmit(e) }}>
          <h2> SIGN UP</h2>
          <label >
            Name:
          </label><br />
          <input type="text" value={name} required onChange={(e)=> { handleChange(e) }} /><br />
          <label>
            Email:
          </label><br />
          <input type="email" value={email} required onChange={(e) => { handleEmailChange(e) }} /><br />
          <label>
            Password:
          </label><br />
          <input type="password" value={password} required onChange={(e) => { handlePasswordChange(e) }} /><br />
          <label>
            Confirm Password:
          </label><br />
          <input type="password" value={confPassword} required onChange={(e) => { handleConfPasswordChange(e) }} /><br />
          <br />
          <input type="submit" value="Submit"/>
        </form>
      </header>
    </div>
  );
}

export default SignUp;