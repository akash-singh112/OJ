import { useState , useEffect } from 'react'
import './App.css'

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
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(details);
  }

  return (
    <div className="container">
      <form onSubmit={handleClick}>
        <h1>Register</h1>
        <div className="fields">
          <input type="text" name='firstname' placeholder='First Name' required onChange={handleChange}/>
          <i class='bx bxs-user-account'></i>
        </div>
        <div className="fields">
          <input type="text" name='middlename' placeholder='Middle Name' onChange={handleChange}/>
          <i class='bx bx-user-circle'></i>
        </div>
        <div className="fields">
          <input type="text" name='lastname' placeholder='Last Name' onChange={handleChange}/>
          <i class='bx bx-user-circle'></i>
        </div>
        <div className="fields">
          <input type="email" name='email' placeholder='Email-ID' required onChange={handleChange}/>
          <i class='bx bxs-envelope'></i>
        </div>
        <div className="fields">
          <input type="password" name='password' placeholder='Password' required minlength='6' onChange={handleChange}/>
          <i class='bx bxs-lock-alt'></i>
        </div>
        <button className="button1">Register</button>
      </form>
    </div>
    
  )
}

export default App
