import {Box, Button, HStack, Text, Textarea, useToast} from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import { useEffect, useRef,useState } from 'react';
import './dd.css'
import {samplecpp,samplejava,samplepy} from '../samples.js'
import { runCode } from './run-code-api.js';
import { changeProblemStatus } from './changeStatus.js';

export const CodeEditor = ({state,setState,details1,setDetails1}) => {
    const [code,setCode] = useState('');
    const [lang,setLang] = useState('Language');
    const [input,setInput] = useState('');
    const [output,setOutput] = useState('');
    const [kolor,setKolor] = useState('');
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const [err,setErr] = useState(false);
    const [errmsg,setErrmsg] = useState('');
    const [option,setOption] = useState('Run window');
    const [arr,setArr] = useState([]);
    const [loading1,setLoading1] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        setKolor(state=='darkmode' ? 'whity' : 'blacky');
    },[state])

    const handleChange = (e)=>{
        //console.log('yahaaan');
        setCode(e);
        //console.log(e);
    }

    const handleMount = (editor)=>{
        ref.current = editor;
        editor.focus();
    }

    const setCpp = ()=>{
        setLang('cpp')
        setCode(samplecpp);
    };
    const setJava = ()=> {
        setLang('java')
        setCode(samplejava);
    };
    const setPy = ()=> {
        setLang('python')
        setCode(samplepy);
    };

    const handleRun = async ()=>{
        try {
            setOption('Run Window');
            setLoading(true);
            const res = await runCode(code,lang,input);
            console.log(res);
            (res.message === 'Running success' ? setErr(false) : setErr(true));
            if(res.message === 'Running success'){
                setOutput(res.output.split('\r\n'))
            }
            else{
                if(lang==='cpp')
                setErrmsg('Error: '+JSON.stringify(res.response.data.message).split('error: ').pop())
                else if(lang==='java')
                setErrmsg('Error: '+JSON.stringify(res.response.data.message).split('java:3: error: ').pop())
                else setErrmsg('NameError: '+JSON.stringify(res.response.data.message).split('NameError: ').pop());
            }
        } catch (error) {
            //display error to user
            toast({
                title:"An error occurred",
                description: error.message||"Unable to run code",
                status:"error",
                duration:5000,
                isClosable:true,
            });
        }
        finally{
            setLoading(false);
        }
    }

    const handleSubmit = async()=>{
        setOption('Submission window')
        setLoading1(true);
        const testcases = details1.hiddenTestCases;
        const output = details1.outputOfHiddenTestCases;
        const n=testcases.length;
        const arr1 = [...Array(details1.hiddenTestCases.length)].fill(0);
        for(let i=0;i<n;i++){
            const res = await runCode(code,lang,testcases[i]);
            console.log(testcases[i]);
            console.log(res);
            console.log(res.output);
            if(res.output == output[i])arr1[i]=1;
            else break;
        }
        if(countOccurrences(arr1,0)==0){
            changeProblemStatus(details1._id,2)
            .then(res => {
                toast({
                    title:"Problem solved",
                    description: res.data.message,
                    status:"success",
                    duration:5000,
                    isClosable:true,
                });
            })
            .catch(e => console.error(e.message));
        }
        setArr(arr1);
        setLoading1(false);
    }

    const handleSwitchState = ()=>{
        option=='Run Window' ? setOption('Submission window') : setOption('Run Window');
    }

    const handleInputChange = (e)=>{
        setInput(e.target.value);
    }

    const generateOutputString = ()=>{
        var s = '';
        (option === 'Run Window' ? (
            !err ? (output && output.map((element,id)=>{
                s += element + '\n';
            })) : (s = errmsg)
        ) : (arr.map((element,id)=>{
            //console.log('logging arr element');
            //console.log(element);
            if(element===1){
                s += `Testcase ${id+1} passed\n`;
            }
            else{
                s += `Testcase ${id+1} failed\n`;
            }
        })))
        return s;
    }

    const countOccurrences = (arr, val) =>
        arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    return(
        <>
            <HStack>
                
            </HStack>
            <HStack spacing={4}>
                <Box margin="40px" w={"45%"} mt={'0px'}>
                    <div className="dropdown">
                    <button className="dropbtn">{lang}</button>
                    <div className="dropdown-content" >
                        <a onClick={setCpp}>cpp</a>
                        <a onClick={setJava}>java</a>
                        <a onClick={setPy}>python</a>
                    </div>
                    </div>
                    <Editor
                    height={"70vh"}
                    language={lang}
                    defaultValue="// write your code here"
                    theme='vs-dark'
                    value={code}
                    onMount={handleMount}
                    onChange={handleChange}
                    options={{
                    fontSize:16,
                    lineHeight:1.3,

                    }} />
                </Box>
                <Box margin="40px" w="45%" mr={"150px"}>
                    <Button bg={option=="Run Window" ? 'green.500' : "red.500"} marginBottom={"2"} fontSize={"lg"} textAlign={"center"} onClick={handleSwitchState} ml={"80px"}>{option}</Button>
                    <Textarea
                    position={"relative"}
                    height={"70vh"}
                    borderRadius={"4px"}
                    borderColor={option === 'Run Window' ? (err ? 'red.500' : "#333") : (arr && countOccurrences(arr,0) ? 'red' : 'green')}
                    marginRight={"20px"}
                    mb={"38px"}
                    value={generateOutputString()}
                    backgroundColor={"black"}
                    color={option === 'Run Window' ? (err ? 'red.500' : "white") : (arr && countOccurrences(arr,0) ? 'red' : 'green')}
                    readOnly={true}
                    resize={"none"}>
                    </Textarea>
                </Box>
            </HStack>
            <Box h={"50wh"} textAlign={"center"} w={"100%"} margin={"1px"}>
                <Text textAlign={"center"} padding-bottom={"10px"} className={`${kolor}`} mb={"1px"}>Input</Text>
                <Textarea
                mr={"40px"}
                className='ph'
                width={"50%"}
                h={"20vh"}
                value={input}
                onChange={handleInputChange}
                size={'lg'}
                placeholder='//enter input, dont add newlines except for py'
                bg={"black"}
                color={"#fff"}
                resize={"none"}
                >
                </Textarea>
            </Box>
            <div className="buttonss">
                <Button className="bu" bg={"green"} mr={"150px"} mt={"40px"} onClick={handleRun} isLoading={loading}>Run</Button>
                <Button className="bu" bg={"red"} ml={"150px"} mt={"40px"} onClick={handleSubmit} isLoading={loading1}>Submit</Button>
            </div>
        </>
    )
};
