import axios from "axios";

export async function SIGNUP (data){
    console.log(data);
    const response = await axios.post('/api/signup',data)
    return response
}

export async function SIGNIN (data){
    console.log(data);
    const response = await axios.post('/api/login',data)
    return response
}