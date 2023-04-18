import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export default async function postLogin(logindata){
    return await axios.post(`${hosturl}/api/Login`,logindata).then((response) => {
        const token = response.data;
        if(token)
        {
            localStorage.setItem("token",JSON.stringify(token));
            window.currentuser = token;
        }
        return token;
    })
}

export function isLoggedIn(){
    if(localStorage.getItem('token') !== null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export function setCurrentUser(token){
    return window.currentuser = token; 
}

export function logout(){
    localStorage.removeItem("token");
    return window.currentuser = undefined;
}