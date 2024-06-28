import { useState , useEffect } from 'react'
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import {sendDataFromFrontendToBackend} from './api_register.js'
import './App2.css'
import { Link, useNavigate } from 'react-router-dom';

//localhost 8800 for register backend
export function Register() {
  const navigate = useNavigate();
  const [details,setDetails] = useState({
    firstname:'',
    middlename:'',
    lastname:'',
    email:'',
    password:''
  });
  const [icon,setIcon] = useState(<FaLock />);
  const [switch1,setSwitch] = useState('password');

  const handleChange = (e) =>{
    //fetch current field being modified and its value//
    const {name,value} = e.target;
    setDetails(prev => {
      return {...prev,[name]:value};
    });
    console.log(e);
  }

  const handleClick = async (e) => {
    //prevents default behaviour of refereshing the page on submitting form//
    e.preventDefault();

    console.log(details);
    
    const response = await sendDataFromFrontendToBackend(details);
    console.log(response);

    setTimeout(()=>{
      navigate('/home/login')
    },2000)
  }

  const handleToggle = ()=>{
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
    <div className="whole2">
      <div className='container1' >
      <form onSubmit={handleClick}>
        <h1 className='h11'>Register</h1>
        <div className="input-box">
          <div className="fields1">
            <input type="text" name='firstname' placeholder='First Name' required onChange={handleChange}/>
            <span className='icons1'><FaRegUserCircle /></span>
          </div>
        </div>
        <div className="input-box">
          <div className="fields1">
            <input type="text" name='middlename' placeholder='Middle Name' onChange={handleChange}/>
            <span className='icons1'><FaUserAlt /></span>
          </div>
        </div>
        <div className="input-box">
          <div className="fields1">
            <input type="text" name='lastname' placeholder='Last Name' onChange={handleChange}/>
            <span className='icons1'><FaUserAlt /></span>
          </div>
        </div>
        <div className="input-box">
          <div className="fields1">
            <input type="email" name='email' placeholder='Email-ID' required onChange={handleChange}/>
            <span className='icons1'><MdEmail /></span>
          </div>
        </div>
        <div className="input-box">
          <div className="fields1">
            <input type={switch1} name='password' placeholder='Password' required minLength='6' onChange={handleChange}/>
            <span onClick={handleToggle} className='icons1' id='pp'>{icon}</span>
          </div>
        </div>
        <button className="button1">Register</button>
        <p id='proclog'>If you have completed registration,proceed to <Link to='/home/login' id='t6'>Login</Link></p>
      </form>
    </div>
    </div>
    
  )
}
