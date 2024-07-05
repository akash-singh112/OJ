const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
//child_process is like a reference to actual terminal/shell

const executeJS = async (filePath,inputFile)=>{
    //run shell command with command
    const command = `node ${filePath}`;
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

module.exports = {executeJS};