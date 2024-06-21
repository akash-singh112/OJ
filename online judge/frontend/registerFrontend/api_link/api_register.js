import axios from 'axios'

const api_url = 'http://localhost:8800';

export const sendDataFromFrontendToBackend = async (details)=>{
    try {
        const response = await axios.post(`${api_url}/register`,details);
        console.log('here1\n');
        console.log(response);
        console.log('here2\n');
        return response.data;
    } catch (error) {
        console.log('Error while making API call',error.message);
    }
};