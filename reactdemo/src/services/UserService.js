import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function postRegister(userdata){
    return await axios.post(`${hosturl}/api/User`,userdata);
}