import axios from 'axios'

const api_url = 'http://localhost:8800';

export const UpdateTheUser = async(input)=>{
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL||api_url}/updateuserinfo`,input);
        //
        return res;
    } catch (error) {
        console.error('Error in establishing api link bw user and database',error);
    }
}