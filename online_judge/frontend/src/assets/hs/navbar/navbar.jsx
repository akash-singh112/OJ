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

    const handleLogoClick = ()=>{
        navigate('/home/welcome');
    }

    const logOut = ()=>{
        localStorage.clear();
        navigate('/home/login');
    }

    return(
        <>
            <div id='navcol' className="container4">
                <Link onClick={handleLogoClick}><img src={leenk}  id='logo' width={150}/></Link>
                <ul id='lists'>
                    <li className='listpt'>Problemset</li>
                    <li className='listpt'>Recent contests</li>
                    <li className='listpt'>Solved Problems</li>
                    <li className='listpt'>Add a question/problem</li>
                    <li className='listpt'>{`Hello, ${localStorage.getItem('name')}!`}</li>
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