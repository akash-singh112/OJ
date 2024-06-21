import axios from 'axios'

const api_url = 'http://localhost:8080';

const sendDataFromFrontendToBackend = async (details)=>{
    try {
        const response = await axios.post(`${api_url}/register`,details);
        return response.details;
    } catch (error) {
        console.log('Error while making API call',error.message);
    }
}

module.exports = {sendDataFromFrontendToBackend};