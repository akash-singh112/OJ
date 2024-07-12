import axios from 'axios'

const api_url = 'http://localhost:6005';

export const runCode = async (code,lang,input) =>{
    try {
        const payload  = {code:code,lang:lang,input:input};
        const response = await axios.post(`${import.meta.env.VITE_COMPILER_URL||api_url}/runcode`,payload);
        //
        return response.data;
    } catch (error) {
        console.error('Error linking api from FE to BE \'api_link_runcode\'',error);
    }
};