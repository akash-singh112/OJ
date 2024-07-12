import axios from 'axios'

const api_url = 'http://localhost:8800';

export const sendDataFromFrontendToBackend = async (details) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/login`,details);
        //
        return response.data;
    } catch (error) {
        console.error('Error linking api from FE to BE \'api_link_login\'',error);
    }
};