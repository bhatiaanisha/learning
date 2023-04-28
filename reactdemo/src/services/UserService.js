import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function postRegister(userdata){
    return await axios.post(`${hosturl}/api/User`,userdata);
}

export async function getUserById(userId){
    return await axios.get(`${hosturl}/api/User/${userId}`);
}

export async function putUser(userId,user){
    return await axios.put(`${hosturl}/api/User/${userId}`,user);
}