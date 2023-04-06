import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

var currentuser = {};
export {currentuser};


export default async function postLogin(logindata){
    return await axios.post(`${hosturl}/api/Login`,logindata).then((response) => {
        const token = response.data;
        if(token)
        {
            localStorage.setItem("token",JSON.stringify(token));
            currentuser = token;
        }
        return token;
    })
}

export function isLoggedIn(){
    if(localStorage.getItem('token') != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export function setCurrentUser(token){
    currentuser = token;
}

export function logout(){
    localStorage.removeItem("token");
    currentuser = undefined;
}