const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');//mapped v4 to uuid so we can use uuid-version 4-variant 1 as 'uuid'

const codeDir = path.join(__dirname,'codeStore');//return path for 'codestore' folder if it were there

if(!fs.existsSync(codeDir)){
    fs.mkdirSync(codeDir,{recursive:true});//rec:true means that if parent directories of codeDir 
    //aren't created,create them as well
}

//check if this folder 'codestore' is already present at codeDir path, if yes then no need to create another
//else create one

const generateExtension = (lang)=>{
    if(lang==='cpp'||lang==='cplusplus'||lang=='c++')return 'cpp';
    if(lang==='Java'||lang==='java')return 'java';
    if(lang==='python'||lang==='py')return 'py';
}

const generateFilePath = (lang,code)=>{
    //generate uuid for this code
    const uniqueId = uuid();
    //console.log(uniqueId);
    //
    const extension = generateExtension(lang);//generate extension based on language
    const fileName = `${uniqueId}.${extension}`;//generate file_name.extension
    const filePath = path.join(codeDir,fileName);//generate path to the file in codeDir
    fs.writeFileSync(filePath,code);//write to the file
    return filePath;//return filePath with code written in it
}

module.exports = {generateFilePath};