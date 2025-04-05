import  axios from 'axios';

export const httpsAxios = axios.create({
  baseURL: process.env.BASE_URL ,
    headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
    },
});