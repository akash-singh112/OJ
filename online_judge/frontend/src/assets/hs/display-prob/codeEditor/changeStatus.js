import axios from 'axios'

const api_url = 'http://localhost:8800';

export const changeProblemStatus = async (id,newStatus) =>{
    try {
        const payload  = {id:id,newStatus:newStatus};
        const response = await axios.post(`${api_url}/changestatus`,payload);
        console.log(response);
        return response;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_changestatus\'',error);
    }
};