import { useParams } from 'react-router-dom'
import './dp.css'
import { useEffect, useState } from 'react';
import { fetchbyID } from './apilink-dp';
import { Navbar } from '../navbar/navbar';
import { CodeEditor } from './codeEditor';

export const DisplayProb = ()=>{

    const {id} = useParams();
    const [details1,setDetails1] = useState({});
    const curr_mode = localStorage.getItem('curr-theme');
    const [state,setState] = useState(curr_mode?curr_mode:'lightmode');
    const [kolor,setKolor] = useState('');
    const [code,setCode] = useState('');
    const [ip,setIp] = useState('');
    const [op,setOp] = useState();

    useEffect(()=>{
        localStorage.setItem('curr-theme',state);
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
    },[state])

    useEffect(()=>{
        fetchbyID(id)
        .then(res => {
            setDetails1(res.data.data[0]);
            console.log('logging data');
            console.log(res.data.data[0].sampleTestCases);
            console.log(res.data.data[0]);
        })
        .catch(e => e.message);
    },[])

    return(
        <>
        <div className={`cc ${state}`}>
            <Navbar state={state} setState={setState}/>
            <h1 id="headerrr">{details1.problem_name}</h1>
            <div className={`maindiv ${state}`}>
                <div className="container55">
                    <p className={`centered ${kolor}`}>Difficulty/Rating:  {details1.difficulty}</p>
                    <p className={`centered ${kolor}`}>Problem Status:{details1.problem_status}</p>
                    <p className={`${kolor}`}><b>Description</b><br/>{details1.description}</p>
                    <p className={`${kolor}`}><b>Constraints</b></p>
                    <ul className={`${kolor}`}>{
                        details1.value_constraints && details1.value_constraints.map((element,idx)=>{
                            return(
                                <li key={idx}>{`${element}`}</li>
                            )
                        })
                    }</ul>
                    <p className={`${kolor}`}><b>Input Description</b><br/>{details1.input_description}</p>
                    <p className={`${kolor}`}><b>Output Description</b><br/>{details1.output_description}</p>
                    <p className={`${kolor}`}><b>Sample Tests</b></p>
                    <ul className={`${kolor}`}>{
                        details1.sampleTestCases && details1.sampleTestCases.map((element,idx)=>{
                            return(
                                <li key={idx}>{`${element}`}</li>
                            )
                        })
                    }</ul>
                    <p className={`${kolor}`}><b>Output</b></p>
                    <ul className={`${kolor}`}>{
                        details1.outputOfSampleTestCases && details1.outputOfSampleTestCases.map((element,idx)=>{
                            return(
                                <li key={idx}>{`${element}`}</li>
                            )
                        })
                    }</ul>
                </div>
                <CodeEditor />
                <div className="buttonss">
                    <button className="run1">Run</button>
                    <button className="sub1">Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}