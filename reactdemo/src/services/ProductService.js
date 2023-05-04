import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;


export async function getAllProducts(){
    return await axios.get(`${hosturl}/api/Product`);
}

export async function getProductsByQuery(itemName){
    return await axios.get(`${hosturl}/api/Product/get`,{params : {itemName : itemName}});
}

export async function getProductDetailsById(productId){
    return await axios.get(`${hosturl}/api/Product/details/${productId}`);
}

export async function getProductById(productId){
    return await axios.get(`${hosturl}/api/Product/${productId}`);
}

export async function postProduct(product){
    return await axios.post(`${hosturl}/api/Product`,product);
}

export async function putProduct(productId,product){
    return await axios.put(`${hosturl}/api/Product/${productId}`,product);
}

export async function deleteProduct(productId){
    return await axios.delete(`${hosturl}/api/Product/${productId}`);
}