import axios from 'axios'

const api_url = 'http://localhost:8800';

export const changeProblemStatus = async (id,problem_id,newStatus) =>{
    try {
        const payload  = {id:id,problem_id:problem_id,newStatus:newStatus};
        console.log('here');
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/changestatus`,payload);
        console.log(response);
        return response;
    } catch (error) {
        console.log('Error linking api from FE to BE \'api_link_changestatus\'',error);
    }
};