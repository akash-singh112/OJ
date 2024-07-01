import React from 'react';
import './navbar.css'
import searchblack from '../main-home-page/search-black.png'
import searchwhite from '../main-home-page/search-white.png'
import night from '../main-home-page/night.png'
import day from '../main-home-page/day.png'
import { Link,useNavigate } from 'react-router-dom';
const leenk = 'https://cdn.dribbble.com/users/2552597/screenshots/17000375/media/81cf207db5d7304913689a8ab42905ec.png?resize=400x300&vertical=center'

export function Navbar({state,setState}){
    const navigate = useNavigate();

    const handleToggle = ()=>{
        if(state === 'lightmode'){
            setState('darkmode')
        }
        else{
            setState('lightmode');
        };
    }

    const logOut = ()=>{
        localStorage.clear();
        navigate('/login');
    }

    return(
        <>
            <div id='navcol' className="container4">
                <Link to='/welcome'><img src={leenk}  id='logo' width={150}/></Link>
                <ul id='lists'>
                    <li className='listpt'><Link to='/ps' className='lenktab'>Problemset</Link></li>
                    <li className='listpt'><Link to='/rec-con' className='lenktab'>Recent Contests</Link></li>
                    <li className='listpt'><Link to='/solv-prob' className='lenktab'>Solved Problems</Link></li>
                    <li className='listpt'><Link to='/addprob' className='lenktab'>Add a problem</Link></li>
                    <li className='listpt'>{`Hello, ${localStorage.getItem('name')}!`}</li>
                    <li className='listpt'><Link to='/welcome' className='lenktab'>Home</Link></li>
                    <li className='listpt' onClick={logOut}>Logout</li>
                </ul>
                <div id='sb' className="search-bar">
                    <input type="text" placeholder='Search User' className='search-box'/>
                    <img src={state === 'lightmode' ? searchwhite : searchblack} id='mag-glass' />
                </div>
                <img onClick={handleToggle} src={state === 'lightmode' ? night : day} id='daytime'/>
            </div>
        </>
)}