import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './fontcolor.css'

export function NotFound(){
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate(-1)
          },3000)
    },[])
    return(
        <div className="whole77">
            <div className='container77'>
                <h1>Status 404:URL not found</h1>
                <h2>Please check the URL you are looking for</h2>
                <br />
                <h3>Go to <Link to='/register' className='clickable'>Register</Link> Page</h3>
                <br />
                <h3>Go to <Link to='/login' className='clickable'>Login</Link> Page</h3>
                <br />
                <p>You will soon be redirected to the previous page</p>
            </div>
        </div>
    )
}