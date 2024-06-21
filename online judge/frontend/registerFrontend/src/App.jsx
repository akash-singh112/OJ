import { useState , useEffect } from 'react'
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

  const handleChange = (e) =>{
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
          <input type="password" name='password' placeholder='Password' required minLength='6' onChange={handleChange}/>
          <i className='bx bxs-lock-alt'></i>
        </div>
        <button className="button1">Register</button>
      </form>
    </div>
    
  )
}

export default App
