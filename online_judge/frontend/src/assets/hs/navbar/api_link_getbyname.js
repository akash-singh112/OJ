import axios from 'axios'

const api_url = 'http://localhost:8800';

export const fetchbyName = async (name) =>{
    try {
        const payload = {name:name};
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/fetchbyname`,payload);
        //
        return response.data.user;
    } catch (error) {
        console.error('Error linking api from FE to BE \'api_link_getforshow\'',error);
    }
};