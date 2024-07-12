import axios from 'axios'

const api_url = 'http://localhost:8800';

export const getProblem = async (name) =>{
    try {
        //console.log(name);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/getprob`,name);
        //console.log('outputting response.data');
        console.log(response);
        return response;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_getprob\'',error.message);
    }
};