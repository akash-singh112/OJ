import { useState ,useEffect , useRef} from 'react'
import boxicons from 'boxicons'
import './App.css'

//frontend_port for login//
const port = 2069;

function App() {
  const ip_ref = useRef();

  const focus1 = () =>{
    ip_ref.current.focus();
  }
  return (
    <div className="container">
      <form action="">
        <h1>Login</h1>
        <div className="ip_box">
            <input ref={ip_ref} type="text" placeholder='Email-ID' required:true/>
            <i class='bx bxs-user'></i>
        </div>
        <div className="ip_box">
            <input type="password" placeholder='Password' required:true/>
            <i class='bx bx-lock'></i>
        </div>
        <button type='submit' className='button1' onClick={focus1}>Login</button>
        <div className="register_link">
          <p>Don't have an account?<a href="#">Register</a></p>
        </div>
      </form>
    </div>
  )
}

export default App
