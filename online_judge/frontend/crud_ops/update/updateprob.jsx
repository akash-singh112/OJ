import { Navbar } from '../../src/assets/hs/navbar/navbar';
import { useState,useEffect } from 'react';
import { UpdateData } from './api-link-update';
import { getProblem } from './get_prob._api';
import { useNavigate } from 'react-router-dom';
import './updateprob.css'

export function UpdateRecord(){
    const curr_mode = localStorage.getItem('curr-theme');
    const [state,setState] = useState(curr_mode?curr_mode:'lightmode');
    const [kolor,setKolor] = useState('');
    const [result,setResult] = useState('');
    const [details,setDetails] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem('curr-theme',state);
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
    },[state])


    const handleChange = (e)=>{
        const {name,value} = e.target;
        setDetails(prev=>{
        return {...prev,[name]:value};
        })
        console.log('yahan hu1');
        console.log(details);
    }

    const handleSubmit = async (e)=>{
        //prevent default refreshing behavior
        e.preventDefault();

        const response = await UpdateData(details);

        setResult(response.message);
        navigate('/ps');
    }

    useEffect(()=>{
        console.log(localStorage.getItem('sendUpdateName'));
        getProblem(localStorage.getItem('sendUpdateName'))
        .then(res => {
            res.data.data.tags.join(',');
            res.data.data.sampleTestCases.join(',');
            res.data.data.outputOfSampleTestCases.join(',');
            res.data.data.hiddenTestCases.join(',');
            res.data.data.outputOfHiddenTestCases.join(',');
            res.data.data.value_constraints.join(',');
            setDetails(res.data.data);
        })
        .catch(e => console.error(e.message));
    },[])

    return(
        <>
        <div className={`container66 ${state}`}>
            <Navbar state={state} setState={setState}/>
            <h1 className={`${kolor}`}>Welcome to the Update Page</h1>
            <p className={`${kolor}`}>Some basic guidelines to follow:</p>
            <ol type="1" className={`guidelines ${kolor}`}>
                <li>Please try to add a problem of rating not less than 500 (equivalent of 800 on Codeforces)</li>
                <li>Mention the problem statement clearly keeping in mind the various doubts contestant might have on reading the problem for the first time</li>
                <li>The constraints on this platform are - time-1s and space-256MB per test. So design your problem keeping that in mind.</li>
                <li>At least 3 sample test-cases and their outputs to be provided.</li>
                <li>At least 20 hidden test-cases and their outputs to be provided.</li>
                <li>Tag(s) should be accompanied with a problem in order of priority.</li>
                <li>Provide one-liner input and output description if possible</li>
            </ol>
            <p id='greeting' className={`${kolor}`}>Happy Problem Creation!</p>
            <form onSubmit={handleSubmit}>
                <div className="fb1">
                    <textarea required placeholder='Tag(s) (comma seperated)' className='textbox' name='tags' defaultValue={details.tags} onChange={handleChange}></textarea>
                    <br />
                    <input required type="text" placeholder='Difficulty' name='difficulty' className='textbox' defaultValue={details.difficulty} onChange={handleChange}/>
                    <br />
                </div>
                <div className="fb2">
                    <textarea required placeholder="Description" name='description' className='textbox' defaultValue={details.description} onChange={handleChange}/>
                    <br />
                    <textarea required placeholder='Constraints(comma seperated)' name='value_constraints' className='textbox' defaultValue={details.value_constraints} onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb3">
                    <textarea required placeholder='Input description' name='input_description' className='textbox' defaultValue={details.input_description} onChange={handleChange}></textarea>
                    <br />
                    <textarea required placeholder='Output description' name='output_description'  className='textbox' defaultValue={details.output_description} onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb4">
                    <textarea required placeholder='Sample test cases(comma seperated)' name='sampleTestCases'  className='textbox' defaultValue={details.sampleTestCases} onChange={handleChange}></textarea>
                    <br />
                    <textarea required placeholder='Output of sample test cases(comma seperated)' name='outputOfSampleTestCases' className='textbox' defaultValue={details.outputOfSampleTestCases} onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb5">
                    <textarea required placeholder='Hidden test cases(comma seperated)' name='hiddenTestCases' className='textbox' defaultValue={details.hiddenTestCases} onChange={handleChange}></textarea>
                    <br />
                    <textarea required placeholder='Output of hidden test cases(comma seperated)' name='outputOfHiddenTestCases' className='textbox' defaultValue={details.outputOfHiddenTestCases} onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb6">
                    <input required input="text" placeholder="Problem name" name='problem_name'  className='textbox' onChange={handleChange} defaultValue={details.problem_name} />
                </div>
                <button type="submit" className='buttonn'>Update problem</button>
            </form>
            <p className={`success_message ${kolor}`}>{result}</p>
        </div>
        </>
    )
}