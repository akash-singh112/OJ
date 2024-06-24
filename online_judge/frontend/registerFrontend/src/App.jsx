import { useState , useEffect } from 'react'
import { Icon } from 'react-icons-kit'
import {locked} from 'react-icons-kit/iconic/locked'
import {unlocked} from 'react-icons-kit/iconic/unlocked'
import {sendDataFromFrontendToBackend} from '../api_link/api_register.js'
import './App.css'


//localhost 2070 for register frontend
//localhost 8800 for register backend
function App() {
  const [details,setDetails] = useState({
    firstname:'',
    middlename:'',
    lastname:'',
    email:'',
    password:''
  });
  const [icon,setIcon] = useState(locked);
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
  }

  const handleToggle = ()=>{
    setSwitch(prev => prev=='password' ? 'text' : 'password');
    setIcon(prev => prev==locked ? unlocked : locked);
  }

  return (
    <div className="container">
      <form onSubmit={handleClick}>
        <h1>Register</h1>
        <div className="fields">
          <input type="text" name='firstname' placeholder='First Name' required onChange={handleChange}/>
          <i className='bx bxs-user-account'></i>
        </div>
        <div className="fields">
          <input type="text" name='middlename' placeholder='Middle Name' onChange={handleChange}/>
          <i className='bx bx-user-circle'></i>
        </div>
        <div className="fields">
          <input type="text" name='lastname' placeholder='Last Name' onChange={handleChange}/>
          <i className='bx bx-user-circle'></i>
        </div>
        <div className="fields">
          <input type="email" name='email' placeholder='Email-ID' required onChange={handleChange}/>
          <i className='bx bxs-envelope'></i>
        </div>
        <div className="fields">
          <input type={switch1} name='password' placeholder='Password' required minLength='6' onChange={handleChange}/>
          <span onClick={handleToggle}><Icon icon={icon}></Icon></span>
        </div>
        <button className="button1">Register</button>
      </form>
    </div>
    
  )
}

export default App
