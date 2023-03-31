import axios from "axios";
import { environment } from '../environment';

const hosturl = environment.appurl;

export function getFurnitureItems(){
    return axios.get(`${hosturl}/api/Furniture`);
}