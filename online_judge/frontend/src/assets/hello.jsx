import { Link } from "react-router-dom"
import './holla.css'

export function Home(){
    return(
    <div className="whole0">
        <div className="container0">
            <img className='logoo'  src='https://cdn.dribbble.com/users/2552597/screenshots/17000375/media/81cf207db5d7304913689a8ab42905ec.png?resize=400x300&vertical=center' width="200px" height="auto" />
            <h1>Welcome to CodeCat Online Judge</h1>
            <br />
            <br />
            <p>If you are a new user, consider registering on this <Link to='register' className='most'>Link</Link></p>
            <br />
            <br />
            <p>If you are an existing user, please log in from this <Link to='login' className="most">Link</Link></p>
            <br />
            <br />
            <p>For any queries, please mail at <Link className="mailcontact">akashsingh242678@gmail.com</Link></p>
        </div>
    </div>
)}