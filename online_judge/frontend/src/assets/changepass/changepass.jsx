import {Navbar} from '../hs/navbar/navbar.jsx'
import { MdSecurity } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import './password.css'
import { useState,useEffect } from 'react';
import {Button, useToast} from "@chakra-ui/react"
import { APICall } from '../../../../backend/api_call.js';

export const ChangePassword = ()=>{
    const curr_mode = localStorage.getItem('curr-theme');
    const [loads,setLoads] = useState(false);
    const [state,setState] = useState(curr_mode?curr_mode:'lightmode');
    const [kolor,setKolor] = useState('');
    const [lock1,setLock1] = useState(<FaLock/>);
    const [text1,setTexttype1] = useState('password');
    const [lock2,setLock2] = useState(<FaLock/>);
    const [text2,setTexttype2] = useState('password');
    const [pass,setPass] = useState({
        cp:"",np:""
    })
    const toast = useToast();

    const handleChange = (e) =>{
        //fetch current field being modified and its value//
        const {name,value} = e.target;
        setPass(prev => {
          return {...prev,[name]:value};
        });
        console.log(e);
      }

    useEffect(()=>{
        localStorage.setItem('curr-theme',state);
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
    },[state])

    const handleSubmit = async()=>{
        setLoads(true);
        console.log(pass.cp);
        console.log(pass.np);

        const res = await APICall('changepass',{id:JSON.parse(localStorage.getItem('userData'))._id,currentPass:pass.cp,newPass:pass.np});
        if(!res){
            toast({
                title:"Current password is incorrect!",
                status:"error",
                duration:1000,
                isClosable:true,
            });
            setLoads(false);
            return;
        }
        toast({
            title:"Password change success!",
            status:"success",
            duration:1000,
            isClosable:true,
        });

        setTimeout(()=>{
            setLoads(false);
            //window.location.reload();
        },1000);

    }

    const handleToggle = ()=>{
        if(text1=='password'){
            setTexttype1('text');
            setLock1(<FaLockOpen />);
        }
        else{
            setTexttype1('password');
            setLock1(<FaLock />);
        }
      }

      const handleToggle2 = ()=>{
        if(text2=='password'){
            setTexttype2('text');
            setLock2(<FaLockOpen />);
        }
        else{
            setTexttype2('password');
            setLock2(<FaLock />);
        }
      }

    return(
        <>
        <div className={`whole99 ${state}`}>
            <Navbar state={state} setState={setState}/>
        </div>
        <h1 id={`headerrr`}>Change password</h1>
        <div className={`ty11 ${state}`}>
            <div className={`whole100 ${state}`}>
                <div className="changeform">
                <form onSubmit={handleSubmit}>
                    <br />
                    <br />
                    <p className={`${kolor}`}>Tip: Try to change your password once in every 15 days or so.</p>
                    <p className={`${kolor}`}>However, dont change the password too frequently as you may forget it</p>
                    <MdSecurity size={"50px"} className={`shield ${kolor}`}/>
                    <div className="fs1">
                        <input onChange={handleChange} className={`ip-fields-up1`} type={text1} name="cp" placeholder='Current Password' />
                        <span onClick={handleToggle} className={`locks1 ${kolor}`}>{lock1}</span>
                    </div>
                    <br />
                    <br />
                    <div className="fs1">
                        <input onChange={handleChange} className={`ip-fields-up1`} type={text2} name="np" placeholder='New Password' />
                        <span onClick={handleToggle2} className={`locks1 ${kolor}`}>{lock2}</span>
                    </div>
                    <p className={`${kolor}`}>Tip: Use a combination of letters,numbers and symbols to secure your password</p>
                    <br />
                    <Button marginLeft={"30px"} isLoading={loads} onClick={handleSubmit} colorScheme='green' color={"white"}>Change</Button>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}