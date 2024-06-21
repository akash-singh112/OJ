import { useRef, useState } from 'react'
import boxicons from 'boxicons'
import {sendDataFromFrontendToBackend} from '../api_link/api_link_login.js'
import './App.css'

//frontend_port 2069 for login//
//backend port 8800 for login//
const port = 2069;

function App() {
  const [details,setDetails] = useState({
    email:'',
    password:'',
  });
  const [result,setResult] = useState('');

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setDetails(prev=>{
      return {...prev,[name]:value};
    })
    console.log('yahan hu1');
    console.log(details);
  }

  const handleSubmit = async (e)=>{
    //to prevent default behaviour of refreshing when form is submitted
    e.preventDefault();
    //console.log(details);

    const response = await sendDataFromFrontendToBackend(details);
    setResult(response.message);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="ip_box">
            <input type="email" name='email' placeholder='Email-ID' required onChange={handleChange}/>
            <i className='bx bxs-user'></i>
        </div>
        <div className="ip_box">
            <input type="password" name='password' placeholder='Password' required onChange={handleChange}/>
            <i className='bx bx-lock'></i>
        </div>
        <button type='submit' className='button1'>Login</button>
        <div className="register_link">
          <p>Don't have an account?<a href="http://localhost:2070/register">Register</a></p>
        </div>
        <div className="response">
          <p>{result}!</p>
        </div>
      </form>
    </div>
  )
}

export default App
