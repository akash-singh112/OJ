const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
//child_process is like a reference to actual terminal/shell

const outputPath = path.join(__dirname,'cppexe');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const generateExtension = (lang)=>{
    if(lang==='cpp'||lang==='cplusplus'||lang=='C++')return 'cpp';
    if(lang==='Java'||lang==='java')return 'java';
    if(lang==='python'||lang==='py')return 'py';
}

const executeCpp = async (filePath,inputFile)=>{
    //extract uuid from filePath
    const uniqueid = path.basename(filePath,`.cpp`);
    console.log(uniqueid);
    //append .exe to make as executable file
    const executableName = `${uniqueid}.exe`;
    console.log(executableName);
    //create path of executable file 
    const executablePath = path.join(outputPath,executableName);
    console.log(executablePath);
    //run shell command with command
    const command = `g++ ${filePath} -o ${executablePath} && cd ${outputPath} && .\\${executableName}`;
    return new Promise((resolve,reject)=>{
        const process = exec(command,(err,stdout,stderr)=>{
            if(err){
                reject(err);
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
        process.stdin.write(inputFile);
        process.stdin.end();
    })
}

module.exports = {executeCpp};