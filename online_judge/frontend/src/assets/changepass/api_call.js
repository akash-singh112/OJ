import axios from 'axios'

const api_url = 'http://localhost:8800';

export const APICall = async(pathOfRequest,input)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/${pathOfRequest}`,input);
        //
        return res;
    } catch (error) {
        console.error('Error in establishing api link bw frontend and backend',error);
    }
}