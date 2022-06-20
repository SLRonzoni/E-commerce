import axios from 'axios';
import Cookies from "universal-cookie";
const cookies=new Cookies(); 

let token=cookies.get('token')

const axiosClient =  axios.create({
    baseURL : "http://localhost:4000/api",
    withCredentials:true,
    timeout:1000,
    headers: {'Access-Control-Allow-Origin': "http://localhost:3000", 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer `+ token
                            }
});
export default axiosClient;