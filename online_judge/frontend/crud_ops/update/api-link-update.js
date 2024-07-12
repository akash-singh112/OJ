import axios from 'axios'

const api_url = 'http://localhost:8800';

export const UpdateData = async (details) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/updaterecord`,details);
        console.log('outputting response');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_update\'',error);
    }
};