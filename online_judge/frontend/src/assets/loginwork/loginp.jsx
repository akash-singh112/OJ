import { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaLock,FaLockOpen } from "react-icons/fa";
import {sendDataFromFrontendToBackend} from './api_link_login.js'
import { Link,useNavigate } from 'react-router-dom'
import './App1.css'

//port 8800 for login backend

export function Login() {
  const navigate = useNavigate();
  const [details,setDetails] = useState({
    email:'',
    password:'',
  });
  const [result,setResult] = useState('');
  const [icon,setIcon] = useState(<FaLock />);
  const [switch1,setSwitch] = useState('password');

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setDetails(prev=>{
      return {...prev,[name]:value};
    })
    //console.log('yahan hu1');
    //console.log(details);
  }

  const handleSubmit = async (e)=>{
    //to prevent default behaviour of refreshing when form is submitted
    e.preventDefault();

    const response = await sendDataFromFrontendToBackend(details);
    const box1 = document.getElementById('rang');
    localStorage.setItem('login',false);
    if(response && response.message){
      localStorage.setItem('name',response.name);
      localStorage.setItem('login',true);
      setResult(response.message);
      box1.classList.add('hara');
      box1.classList.remove('lal');
      setTimeout(()=>{
        navigate('/welcome');
      },500)
    }
    else{
      localStorage.setItem('login',false);
      setResult('Wrong credentials');
      box1.classList.add('lal');
      box1.classList.remove('hara');
      setTimeout(()=>{
          navigate(0);
      },500)
    }
  }

  const handleSwitch = ()=>{
    if(switch1=='password'){
      setSwitch('text');
      setIcon(<FaLockOpen />);
    }
    else{
      setSwitch('password');
      setIcon(<FaLock />);
    }
  }

  return (
    <div className="whole1">
      <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="ip_box">
            <input type="email" name='email' placeholder='Email-ID' required onChange={handleChange}/>
            <span className='icons'><MdEmail /></span>
        </div>
        <div className="ip_box">
            <input type={switch1} name='password' placeholder='Password' id='pass' required onChange={handleChange}/>
            <span className='icons' onClick={handleSwitch}>{icon}</span>
        </div>
        <a href='#' className='forgot'>Forgot password?</a>
        <button type='submit' className='button1'>Login</button>
        <div className="register_link">
          <p>Don't have an account?   <Link to='/register' className='link1'>Register</Link></p>
        </div>
        <div className="response">
          <p className='laal' id='rang'>{result}</p>
        </div>
      </form>
    </div>
    </div>
  )
}
