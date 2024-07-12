import { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaLock,FaLockOpen } from "react-icons/fa";
import {sendDataFromFrontendToBackend} from './api_link_login.js'
import { Link,useNavigate } from 'react-router-dom'
import './App1.css'
import {Button,Text} from'@chakra-ui/react'

//port 8800 for login backend

export function Login() {
  const [loading,setLoading] = useState(false);
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
    //
  }

  const handleSubmit = async (e)=>{
    //to prevent default behaviour of refreshing when form is submitted
    e.preventDefault();

    setLoading(true);
    const response = await sendDataFromFrontendToBackend(details);
    const box1 = document.getElementById('rang');
    localStorage.setItem('login',false);
    if(response && response.message){
      //
      localStorage.setItem('login',true);
      localStorage.setItem('userData',JSON.stringify(response.userData))
      setResult(response.message);
      box1.classList.add('hara');
      box1.classList.remove('lal');
      setTimeout(()=>{
        setLoading(false);
        navigate('/welcome');
      },1000)
    }
    else{
      localStorage.setItem('login',false);
      setResult('Wrong credentials');
      setLoading(false);
      box1.classList.add('lal');
      box1.classList.remove('hara');
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
            <span className='icons'><MdEmail/></span>
        </div>
        <div className="ip_box">
            <input type={switch1} name='password' placeholder='Password' id='pass' required onChange={handleChange}/>
            <span className='icons' onClick={handleSwitch}>{icon}</span>
        </div>
        <a href='#' className='forgot'>Forgot password?</a>
        <Button type="submit" className="button1" isLoading={loading} loadingText="Logging in">Login</Button>
        <div className="register_link">
          <p>Don't have an account?   <Link to='/register' className='link1'>Register</Link></p>
        </div>
        <div className="response">
          <Text className='laal' id='rang' textAlign={"center"}>{result}</Text>
        </div>
      </form>
    </div>
    </div>
  )
}
