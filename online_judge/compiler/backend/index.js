const express = require('express');
const {generateFilePath} = require('./genpath.js');
const {executeCpp} = require('./execCpp.js')
const {executeJava} = require('./execJava.js')
const {executePy} = require('./execPy.js')
const app = express();

//port 1010 for compiler backend
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//
app.get('/',(req,res)=>{
    res.json({
        hello:'world'
    })
})

const generateExtension = (lang)=>{
    if(lang==='cpp'||lang==='cplusplus'||lang=='C++'||lang==='c++')return 'cpp';
    if(lang==='Java'||lang==='java')return 'java';
    if(lang==='python'||lang==='py')return 'py';
}

app.post('/run',async (req,res)=>{
    const {lang,code,inputFile} = req.body;
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
            case 'cpp': output = await executeCpp(filePath,inputFile);break;
            case 'java': output = await executeJava(filePath,inputFile);break;
            case 'py' : output = await executePy(filePath,inputFile);break;
        }
        console.log(output);
        res.send({output});
    } catch (error) {
        res.status(406).json({
            success:false,message:`Error : ${error.message}`
        })
    }


})

app.listen(1010,()=>{
    console.log('Server is listening to port 1010!');
})