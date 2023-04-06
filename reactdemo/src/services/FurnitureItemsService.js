import axios from "axios";
import { environment } from '../environment';

const hosturl = environment.appurl;

export async function getFurnitureItems(){
    return await axios.get(`${hosturl}/api/Furniture`);
}