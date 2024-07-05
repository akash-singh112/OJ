const express = require("express");
const {generateFilePath} = require('./genpath.js');
const {executeCpp} = require('./execCpp.js')
const {executeJava} = require('./execJava.js')
const {executePy} = require('./execPy.js');
const { executeJS } = require("./execJS.js");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//compiler server on port {6005}
const port = 6005;
const app = express();

//add middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const generateExtension = (lang)=>{
    if(lang==='cpp'||lang==='cplusplus'||lang=='C++'||lang==='c++')return 'cpp';
    if(lang==='Java'||lang==='java')return 'java';
    if(lang==='python'||lang==='py')return 'py';
    if(lang==='javascript'||lang==='js')return 'js';
}

app.get('/',(req,res)=>{
    res.status(201).json({online_judge:"compiler"});
})

app.post('/runcode',async (req,res)=>{
    const {code,lang,input} = req.body;
    //if user chose no language
    if(lang === undefined){
        return res.status(405).json({success:false , message:'No language chosen'});
    }

    //if code is empty
    if(code === undefined){
        return res.status(404).json({success:false , message:'Empty code'});
    }

    //so we know now both language and code are non-empty fields
    try {
        const filePath = generateFilePath(lang,code);//all functions used inside are asynchronous already
        const extension = generateExtension(lang);
        var output;
        switch (extension) {
            case 'cpp': output = await executeCpp(filePath,input);break;
            case 'java': output = await executeJava(filePath,input);break;
            case 'py' : output = await executePy(filePath,input);break;
            case 'js' : output = await executeJS(filePath,input);break;
        }
        console.log(output);
        res.status(201).send({
            message:'Running success',
            success:true,
            output:output
        })
    } catch (error) {
        res.status(406).json({
            success:false,message:`Error : ${error.message}`
        })
    }
})

app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
})