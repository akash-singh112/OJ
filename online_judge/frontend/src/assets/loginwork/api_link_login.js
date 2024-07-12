import axios from 'axios'

const api_url = 'http://localhost:8800';

export const sendDataFromFrontendToBackend = async (details) =>{
    try {
        console.log(import.meta.env.VITE_BACKEND_URL);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/login`,details);
        console.log('outputting response');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_login\'',error);
    }
};