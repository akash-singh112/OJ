const express = require("express");
const {generateFilePath} = require('../../compiler/backend/genpath.js');
const {executeCpp} = require('../../compiler/backend/execCpp.js')
const {executeJava} = require('../../compiler/backend/execJava.js')
const {executePy} = require('../../compiler/backend/execPy.js')
const router = express.Router();

const generateExtension = (lang)=>{
    if(lang==='cpp'||lang==='cplusplus'||lang=='C++'||lang==='c++')return 'cpp';
    if(lang==='Java'||lang==='java')return 'java';
    if(lang==='python'||lang==='py')return 'py';
}

router.post('/',async (req,res)=>{
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

module.exports = router;