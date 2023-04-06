import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function getAllProducts(){
    return await axios.get(`${hosturl}/api/Product`);
}

export async function getProductById(productId){
    return await axios.get(`${hosturl}/api/Product/${productId}`);
}