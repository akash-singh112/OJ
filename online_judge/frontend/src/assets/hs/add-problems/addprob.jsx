import { Navbar } from '../navbar/navbar'
import { useState,useEffect } from 'react';
import { sendDataFromFrontendToUser1 } from './api-link-ps';
import './addprob.css'
import { useNavigate } from 'react-router-dom';
import { Button,ChakraProvider } from '@chakra-ui/react';

export function AddProb(){
    const [l,sl] = useState(false);
    const curr_mode = localStorage.getItem('curr-theme');
    const [state,setState] = useState(curr_mode?curr_mode:'lightmode');
    const [kolor,setKolor] = useState('');
    const navigate = useNavigate();
    const [details,setDetails] = useState({
        problem_status:0,
        tags:'',
        difficulty:'',
        problem_name:'',
        description:'',
        value_constraints:'',
        input_description:'',
        output_description:'',
        sampleTestCases:'',
        outputOfSampleTestCases:'',
        hiddenTestCases:'',
        outputOfHiddenTestCases:''
    });

    useEffect(()=>{
        localStorage.setItem('curr-theme',state);
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
    },[state])


    const handleChange = (e)=>{
        const {name,value} = e.target;
        setDetails(prev=>{
        return {...prev,[name]:value};
        })
        //
    }

    const handleSubmit = async (e)=>{
        //prevent default refreshing behavior
        e.preventDefault();
        sl(true);

        const response = await sendDataFromFrontendToUser1(details);

        setTimeout(()=>{
            sl(false);
            navigate('/ps');
        },2000);
    }

    return(
        <>
        <div className={`container636 ${state}`}>
            <Navbar state={state} setState={setState}/>
            <h1 className={`${kolor} ty`}>Welcome to the problemsetting Page</h1>
            <p className={`${kolor}`}>Some basic guidelines to follow:</p>
            <ol type="1" className={`guidelines ${kolor}`}>
                <li className='pointers'>Please try to add a problem of rating not less than 500 (equivalent of 800 on Codeforces)</li>
                <li className='pointers'>Mention the problem statement clearly keeping in mind the various doubts contestant might have on reading the problem for the first time</li>
                <li className='pointers'>The constraints on this platform are - time-1s and space-256MB per test. So design your problem keeping that in mind.</li>
                <li className='pointers'>At least 3 sample test-cases and their outputs to be provided.</li>
                <li className='pointers'>At least 20 hidden test-cases and their outputs to be provided.</li>
                <li className='pointers'>Tag should be accompanied with a problem in order of its priority.</li>
                <li className='pointers'>Provide one-liner input and output description if possible</li>
            </ol>
            <p id='greeting' className={`${kolor}`}>Happy Problem Creation!</p>
            <form onSubmit={handleSubmit}>
                <div className="fb1">
                    <textarea required placeholder='Tag(s) (comma seperated)' className='textbox' name='tags' onChange={handleChange}></textarea>
                    <br />
                    <input required type="text" min={"500"} max={"5000"} placeholder='Difficulty' name='difficulty' className='textbox'onChange={handleChange}/>
                    <br />
                </div>
                <div className="fb2">
                    <textarea required placeholder="Description" name='description' className='textbox' onChange={handleChange}/>
                    <br />
                    <textarea required placeholder='Constraints(comma seperated)' name='value_constraints' className='textbox' onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb3">
                    <textarea required placeholder='Input description' name='input_description' className='textbox' onChange={handleChange}></textarea>
                    <br />
                    <textarea required placeholder='Output description' name='output_description'  className='textbox' onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb4">
                    <textarea required placeholder='Sample test cases(comma seperated)' name='sampleTestCases'  className='textbox' onChange={handleChange}></textarea>
                    <br />
                    <textarea required placeholder='Output of sample test cases(comma seperated)' name='outputOfSampleTestCases' className='textbox' onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb5">
                    <textarea required placeholder='Hidden test cases(comma seperated)' name='hiddenTestCases' className='textbox'onChange={handleChange}></textarea>
                    <br />
                    <textarea required placeholder='Output of hidden test cases(comma seperated)' name='outputOfHiddenTestCases' className='textbox'onChange={handleChange}></textarea>
                    <br />
                </div>
                <div className="fb6">
                    <input required input="text" placeholder="Problem name" name='problem_name'  className='textbox' onChange={handleChange}/>
                </div>
                <Button type="submit" className='buttonn' isLoading={l}>Add problem</Button>
            </form>
        </div>
        </>
    )
}