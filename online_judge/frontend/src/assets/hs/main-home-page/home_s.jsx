import React, { useEffect, useState } from 'react'
import '../main-home-page/hs.css'
import { Navbar } from '../navbar/navbar.jsx'

export function HomeScreen(){
    const curr_mode = localStorage.getItem('curr-theme');
    const [state,setState] = useState(curr_mode?curr_mode:'lightmode');
    const [kolor,setKolor] = useState('');

    useEffect(()=>{
        localStorage.setItem('curr-theme',state);
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
    },[state])

    return(
        <div className={`whole3 ${state}`}>
            <div className={`container3`}>
                <Navbar state={state} setState={setState}/>
                <h2 className={`miniheader ${kolor}`}>Abstract</h2>
                <p className={`abouttxt ${kolor}`}>CodeCat is an Online Judge where users can enhance their 
                problem-solving skills by taking part in contests and solving a 
                given set of problem statements. Allowed languages are C++, Java and
                Python as of now. However, our team is working to add more popular languages 
                like JS, Ruby etc. Please feel free to contact our team in case of any queries.
                As a growing platform, we encourage users to add problems to improve our existing
                problemset. You shall see already added problems on topics like Array, Stack, Queue, Hashing,
                Graph algorithms, Dynamic-Programming(DP).
                <br /> 
                The original problems have been set by our lead,
                Akash Singh, who is an enthusiastic coder and also a <a className={`${kolor}`} href="https://codeforces.com/profile/potato_xD">specialist</a> on CodeForces.
                <br />
                Thank you for your co-operation and have a great experience!
            </p>
            </div>
        </div>
)}