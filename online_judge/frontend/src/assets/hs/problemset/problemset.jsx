import { useState,useEffect } from "react";
import { Navbar } from "../navbar/navbar";
import '../problemset/problemset.css'
import {fetchDataFromDatabase} from './apilinkps.js'
import { MdDelete,MdOutlineUpdate } from "react-icons/md";
import { deleteDataFromDatabase } from './delprob_api.js';
import { Link } from "react-router-dom";

export const Problemset = ()=>{
    const curr_mode = localStorage.getItem('curr-theme');
    const [details,setDetails] = useState([]);
    const [state,setState] = useState(curr_mode?curr_mode:'lightmode');
    const [kolor,setKolor] = useState('');
    const [delres,setDelres] = useState('');
    const [bc,setBc] = useState('');

    useEffect(()=>{
        localStorage.setItem('curr-theme',state);
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
        setBc(state=='darkmode' ? 'whiteborder' : 'blackborder');
    },[state])

    useEffect(()=>{
        fetchDataFromDatabase()
        .then(res => setDetails(res))
        .catch(e => console.error(e.message));
    },[])
    console.log('lol',details);

    const eventDelete = async (name)=>{
        const response = await deleteDataFromDatabase(name);
        setDelres(response);
    }

    return(
        <div className={`container22 ${state}`}>
            <Navbar state={state} setState={setState}/>
            <h1 className={`${kolor} heamder`}>Problemset</h1>
            <table width="100%" className={`tablecover ${bc}`}>
                <thead>
                    <tr className={`displaytable ${kolor}`} align="center">
                        <th width="5%"  height="40px" className={`${bc}`}>S.No.</th>
                        <th width="25%" height="40px" className={`${bc}`}>Problem Title</th>
                        <th width="10%" height="40px" className={`${bc}`}>Problem Status</th>
                        <th width="10%" height="40px" className={`${bc}`}>Difficulty</th>
                        <th width="30%" height="40px" className={`${bc}`}>Tags</th>
                        <th width="10%" height="40px" className={`${bc}`}>Update</th>
                        <th width="10%" height="40px" className={`${bc}`}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details.map((entry,i)=>{
                            return(
                                <tr key={i} align="center" className={`${kolor} editing`}>
                                    <td className={`${bc}`}>{i+1}</td>
                                    <td className={`${bc}`}>{entry.problem_name}</td>
                                    <td className={`${bc}`}>{entry.problem_status}</td>
                                    <td className={`${bc}`}>{entry.difficulty}</td>
                                    <td className={`${bc}`}>{entry.tags.join(',')}</td>
                                    <td className={`${bc}`}><Link to="/updaterecord"><MdOutlineUpdate className='botton'/></Link></td>
                                    <td className={`${bc}`}><MdDelete className='botton'/>{delres}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}