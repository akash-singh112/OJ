import axios from 'axios'

const api_url = 'http://localhost:8800';

export const UpdateTheUser = async(input)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/updateuserinfo`,input);
        console.log('logging response');
        console.log(res);
        return res;
    } catch (error) {
        console.log('Error in establishing api link bw user and database',error);
    }
}