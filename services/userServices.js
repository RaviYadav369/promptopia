import axios from "axios";

export async function signUp (data){
    console.log(data);
    const response = await axios.post('/api/signup',data)
    return response
}

export async function signIn (data){
    console.log(data);
    const response = await axios.post('/api/login',data)
    return response
}