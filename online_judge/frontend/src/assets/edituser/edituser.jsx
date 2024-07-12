import './edituser.css'
import {Navbar} from '../hs/navbar/navbar.jsx'
import { Button, ChakraProvider, useToast } from '@chakra-ui/react'
import { useState,useEffect } from 'react'
import { UpdateTheUser } from './updateUser_api.js'
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";

export const EditUser = ()=>{
    const [l,sl] = useState(false);
    const curr_mode = localStorage.getItem('curr-theme');
    const [state,setState] = useState(curr_mode?curr_mode:'lightmode');
    const [kolor,setKolor] = useState('');
    const toast = useToast();
    const [input,setInput] = useState({
        address_line1:JSON.parse(localStorage.getItem('userData')).address_line1,
        address_line2:JSON.parse(localStorage.getItem('userData')).address_line2,
        address_line3:JSON.parse(localStorage.getItem('userData')).address_line3,
        address_line4:JSON.parse(localStorage.getItem('userData')).address_line4,
        state1:JSON.parse(localStorage.getItem('userData')).state,
        zipcode:JSON.parse(localStorage.getItem('userData')).zipcode,
        dob:JSON.parse(localStorage.getItem('userData')).dob,
        contact_no:JSON.parse(localStorage.getItem('userData')).contact_no,
        id:JSON.parse(localStorage.getItem('userData'))._id
    })

    useEffect(()=>{
        localStorage.setItem('curr-theme',state);
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
    },[state])

    const handleChange = (e) =>{
        //fetch current field being modified and its value//
        const {name,value} = e.target;
        setInput(prev => {
          return {...prev,[name]:value};
        });
        //
      }

    const handleUpdateQuery = async(e)=>{
        e.preventDefault();

        sl(true)
        const res = await UpdateTheUser(input);

        const obj = JSON.parse(localStorage.getItem('userData'));
        localStorage.removeItem('userData');
        obj.address_line1 = input.address_line1;
        obj.address_line2 = input.address_line2;
        obj.address_line3 = input.address_line3;
        obj.address_line4 = input.address_line4;
        obj.state = input.state1;
        obj.zipcode = input.zipcode;
        obj.dob = input.dob;
        obj.contact_no = input.contact_no;

        localStorage.setItem('userData',JSON.stringify(obj));

        setTimeout(()=>{
            sl(false);
            toast({
                title:"Update success!",
                status:"success",
                duration:5000,
                isClosable:true,
            });
        },2500)
    }

    return(
        <>
            <div  className={`${state}`}>
                <Navbar state={state} setState={setState}/>
            </div>
            <h1 id={`headerrr`}>Update user details</h1>
            <div className={`wholee56 ${state}`}>
                <div className={`container65 ${state}`}>
                    <form onSubmit={handleUpdateQuery}>
                        <p className={`${kolor}`}>The following fields are read-only: Firstname, Middlename, Lastname, Email-ID</p>
                        <br />
                        <input className={`ip-fields-up`} type="text" name="firstname" id="" value={JSON.parse(localStorage.getItem('userData')).firstname} readOnly={true} onChange={handleChange}/>
                        <span><FaUserAlt id='user6777' size={"20px"} className={`icons232`}/></span>
                        <br />
                        <br />
                        <input type="text" className={`ip-fields-up`} placeholder='Middle Name' name="middlename" id="" value={JSON.parse(localStorage.getItem('userData')).middlename} readOnly={true}/>
                        <br />
                        <br />
                        <input type="text" className={`ip-fields-up`} placeholder='Last Name' name="lastname" id="" value={JSON.parse(localStorage.getItem('userData')).lastname} readOnly={true}/>
                        <br />
                        <br />
                        <input type="text" className={`ip-fields-up`} name="emailid" id="" value={JSON.parse(localStorage.getItem('userData')).email} readOnly={true}/>
                        <span><MdEmail id='email6777' size={"20px"} className={`icons232`}/></span>
                        <br />
                        <br />
                        <p className={`${kolor}`}>Permanent address</p>
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).address_line1} type="text" required onChange={handleChange} name="address_line1" id="" className={`ip-fields-up1`} placeholder='Address Line 1'/>
                        <AiFillHome id='home6777' size={"20px"} className='icons232'/>
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).address_line2} type="text" onChange={handleChange} name="address_line2" id="t66" className={`ip-fields-up1`} placeholder='Address Line 2'/>
                        <br />
                        <br />
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).address_line3} type="text" onChange={handleChange} name="address_line3" id="" className={`ip-fields-up1`} placeholder='Address Line 3'/>
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).address_line4} type="text" onChange={handleChange} name="address_line4" id="t7" className={`ip-fields-up1`} placeholder='Address Line 4'/>
                        <br />
                        <br />
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).state} type="text" required onChange={handleChange} name="state1" id="" className={`ip-fields-up`} placeholder='State'/>
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).zipcode} type="text" required onChange={handleChange} name="zipcode" id="t88" className={`ip-fields-up`} placeholder='Zipcode'/>
                        <br />
                        <br />
                        <p className={`${kolor}`}>Other details</p>
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).dob} type="text" required onChange={handleChange} name="dob" id="" className={`ip-fields-up`} placeholder='Date of birth(dd/mm/yy)'/>
                        <CiCalendarDate id='cal6777' size={"28px"} className='icons232'/>
                        <input defaultValue={JSON.parse(localStorage.getItem('userData')).contact_no} type="text" required onChange={handleChange} name="contact_no" id="t89" className={`ip-fields-up`} placeholder='Contact number(country code followed by number)'/>
                        <FaPhone size={"20px"} className='icons26_phone'/>
                        <br />
                        <br />
                        <p className={`${kolor}`}>To change password securely, click the 'Change passkey' option in the profile dropdown menu</p>
                        <br />
                        <ChakraProvider>
                            <Button isLoading={l} colorScheme={'green'} onClick={handleUpdateQuery} className='update-button'>Update changes</Button>
                        </ChakraProvider>
                    </form>
                </div>
            </div>
        </>
    )
}