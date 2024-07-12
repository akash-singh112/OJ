import axios from 'axios'

const api_url = 'http://localhost:8800';

export const deleteDataFromDatabase = async (name) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/delprob`,name);
        //console.log('outputting response.data');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error linking api from FE to BE \'deleting element\'',error);
    }
};