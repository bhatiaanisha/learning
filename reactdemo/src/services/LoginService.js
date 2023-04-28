import axios from "axios";
import { environment } from "../environment";
import { dataService } from "../shared/RxJsState";

const hosturl = environment.appurl;


export default async function postLogin(logindata){
    return await axios.post(`${hosturl}/api/Login`,logindata);
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

export function logout(){
    localStorage.removeItem("token");
    dataService.setData("");
}