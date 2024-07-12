import axios from 'axios'

const api_url = 'http://localhost:8800';

export const sendDataFromFrontendToUser1 = async (details) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/addprob`,details);
        console.log('outputting response');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_ps\'',error);
    }
};