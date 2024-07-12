import axios from 'axios'

const api_url = 'http://localhost:8800';

export const fetchDataFromDatabase = async () =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL||api_url}/ps`);
        //console.log('outputting response.data');
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_ps\'',error);
    }
};