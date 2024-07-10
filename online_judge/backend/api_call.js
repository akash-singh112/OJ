import axios from 'axios'

const api_url = 'http://localhost:8800';

export const APICall = async(pathOfRequest,input)=>{
    try {
        const res = await axios.post(`${api_url}/${pathOfRequest}`,input);
        console.log('logging response');
        console.log(res);
        return res;
    } catch (error) {
        console.log('Error in establishing api link bw frontend and backend',error);
    }
}