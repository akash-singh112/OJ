import {Box, Button, HStack, Text, Textarea, useToast} from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import { useEffect, useRef,useState } from 'react';
import './dd.css'
import {samplecpp,samplejava,samplepy} from '../samples.js'
import { runCode } from './run-code-api.js';

export const CodeEditor = ({state,setState,details1}) => {
    const [code,setCode] = useState('');
    const [lang,setLang] = useState('Language');
    const [input,setInput] = useState('');
    const [output,setOutput] = useState('');
    const [kolor,setKolor] = useState('');
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const [err,setErr] = useState(false);
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
            setLoading(true);
            const res = await runCode(code,lang,input);
            setOutput(res.data.output.split('\r\n'));
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
    //let arr = [...Array(details1.hiddenTestCases.length)].fill(0);
    const handleSubmit = async()=>{
        console.log(details1);
        const testcases = details1.hiddenTestCases;
        //console.log(testcases);
        const output = details1.outputOfHiddenTestCases;
        //console.log(output);
        //console.log(typeof testcases);
        testcases.map(async(ele,id)=>{
            const result = await runCode(code,lang,ele);
            // console.log(output[id]);
            // console.log(typeof result.data.output);
            // console.log(typeof output[id]);
            if(result && (result.data.output == output[id]))console.log(1);
            else console.log(0);
        })
    }

    const handleInputChange = (e)=>{
        setInput(e.target.value);
        //console.log(e.target.value);
    }

    return(
        <>
            <div className="dropdown">
                <button className="dropbtn">{lang}</button>
                <div className="dropdown-content" >
                    <a onClick={setCpp}>cpp</a>
                    <a onClick={setJava}>java</a>
                    <a onClick={setPy}>python</a>
                </div>
            </div>
            <HStack spacing={4}>
                <Box margin="30px" padding-top="2px" w={"50%"}>
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
                <Box w="50%">
                    <Text marginBottom={"2"} fontSize={"lg"} className={`${kolor}`} textAlign={"center"}>Output</Text>
                    <Box
                    height={"70vh"}
                    padding={"2px"}
                    border={"1px solid"}
                    borderRadius={"4px"}
                    borderColor={"#333"}
                    marginRight={"5px"}
                    mb={"20px"}
                    backgroundColor={"black"}
                    color={"white"}>
                    {
                        output && output.map((element,idx)=>{
                            return(<Text key={idx}>{element}</Text>)
                        })
                    } 
                    </Box>
                </Box>
            </HStack>
            <Box h={"50wh"} textAlign={"center"} w={"100%"}>
                <Text textAlign={"center"} padding-bottom={"10px"} className={`${kolor}`}>Input</Text>
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
                <Button className="bu" onClick={handleRun} isLoading={loading} bg={"red"} mr={"150px"} mt={"40px"}>Run</Button>
                <Button className="bu" bg={"green"} ml={"150px"} mt={"40px"} onClick={handleSubmit}>Submit</Button>
            </div>
        </>
    )
};
