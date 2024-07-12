import axios from 'axios'

const api_url = 'http://localhost:8800';

export const getProblem = async (name) =>{
    try {
        //
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/getprob`,name);
        //
        return response;
    } catch (error) {
        console.error('Error linking api from FE to BE \'api_link_getprob\'',error.message);
    }
};