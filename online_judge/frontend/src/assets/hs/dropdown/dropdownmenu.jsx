import './dropdownmenu.css'
import { FaUserCircle } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { MdModeEditOutline } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { Checkmark } from 'react-checkmark'

export const DropdownMenu = ()=>{
    const navigate = useNavigate();

    const logOut = ()=>{
        localStorage.clear();
        navigate('/login');
        //success
    }
    return(
        <>
            <div className="dropdown1">
                <button className="dropbtn1"><FaUserCircle size={"23px"} className="usericon"/></button>
                <div className="dropdown-content1">
                    <h3 id="kk">{`Hello, ${JSON.parse(localStorage.getItem('userData')).firstname}!`}</h3>
                    <Checkmark size="24px"/>
                    <Link to="/edituser" className='inl'>Edit profile  <MdModeEditOutline className='ic inl'/></Link>
                    <Link to="/changepass" className='inl'>Change passkey  <GrSecure className='ic inl'/></Link>
                    <a onClick={logOut} className='inl'>Logout  <CgLogOut className='ic inl'/></a>
                </div>
            </div>
        </>
    )
}
