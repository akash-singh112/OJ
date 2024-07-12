import axios from 'axios'

const api_url = 'http://localhost:8800';

export const fetchbyName = async (name) =>{
    try {
        const payload = {name:name};
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/fetchbyname`,payload);
        //console.log('outputting response.data');
        console.log(response);
        return response.data.user;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_getforshow\'',error);
    }
};