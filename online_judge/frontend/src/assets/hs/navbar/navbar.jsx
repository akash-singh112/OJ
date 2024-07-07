import React,{useState} from 'react';
import './navbar.css'
import { Link,useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { fetchbyName } from './api_link_getbyname';
import { DropdownMenu } from '../dropdown/dropdownmenu';
import { FaSun } from "react-icons/fa6";
import { IoMoon } from "react-icons/io5";

const leenk = 'https://cdn.dribbble.com/users/2552597/screenshots/17000375/media/81cf207db5d7304913689a8ab42905ec.png?resize=400x300&vertical=center'

export function Navbar({state,setState}){
    const [search,setSearch] = useState('');
    const navigate = useNavigate();

    const handleToggle = ()=>{
        if(state === 'lightmode'){
            setState('darkmode')
        }
        else{
            setState('lightmode');
        };
    }

    const handleChange = (e)=>{
        setSearch(e.target.value);
    }

    const handleSearch = async(e)=>{
        e.preventDefault();

        search[0].toUpperCase();
        const res = await fetchbyName(search);

        navigate(`/displayprob/${res[0]._id}`);
    }

    return(
        <>
            <div id='navcol' className="container4">
                <Link to='/welcome'><img src={leenk}  id='logo' width={150}/></Link>
                <ul id='lists'>
                    <li className='listpt'><Link to='/ps' className='lenktab'>Problemset</Link></li>
                    <li className='listpt'><Link to='/rec-con' className='lenktab'>Recent Contests</Link></li>
                    <li className='listpt'><Link to='/addprob' className='lenktab'>Add a problem</Link></li>
                    <li className='listpt'><Link to='/welcome' className='lenktab'>Home</Link></li>
                </ul>
                <div id='sb' className="search-bar">
                    <input type="text" placeholder='Search Problem' className='search-box' onChange={handleChange}/>
                    <FaSearch color={state==='lightmode' ? "white" : "black"} size={'20px'} onClick={handleSearch} cursor={"pointer"}/>
                </div>
                {state === 'lightmode' ? <IoMoon onClick={handleToggle} cursor={"pointer"} className="sm11" size={"50px"}/> : <FaSun onClick={handleToggle} cursor={"pointer"} className="sm11" size={"50px"}/>}
                <DropdownMenu/>
            </div>
            
        </>
)}