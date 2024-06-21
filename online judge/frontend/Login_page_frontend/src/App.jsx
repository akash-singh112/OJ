import { useState } from 'react'
import { Icon } from 'react-icons-kit'
import {locked} from 'react-icons-kit/iconic/locked'
import {unlocked} from 'react-icons-kit/iconic/unlocked'
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
  const [icon,setIcon] = useState(locked);
  const [switch1,setSwitch] = useState('password');

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

  const handleSwitch = ()=>{
    setSwitch(prev => prev=='password' ? 'text' : 'password');
    setIcon(prev => prev==locked ? unlocked : locked);
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
            <input type={switch1} name='password' placeholder='Password' id='pass' required onChange={handleChange}/>
            <span onClick={handleSwitch}><Icon icon={icon}></Icon></span>
        </div>
        <button type='submit' className='button1'>Login</button>
        <div className="register_link">
          <p>Don't have an account?   <a href="http://localhost:2070/register">Register</a></p>
        </div>
        <div className="response">
          <p>{result}</p>
        </div>
      </form>
    </div>
  )
}

export default App
