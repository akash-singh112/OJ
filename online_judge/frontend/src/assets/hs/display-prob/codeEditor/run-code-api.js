import axios from 'axios'

const api_url = 'http://localhost:8800';

export const runCode = async (code,lang,input,flag) =>{
    try {
        const payload  = {code:code,lang:lang,input:input};
        const response = await axios.post(`${api_url}/runcode`,payload);
        //console.log('outputting response.data');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_runcode\'',error);
        return error;
    }
};