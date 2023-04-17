import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function getSubCategory(){
    return await axios.get(`${hosturl}/api/SubCategory`);
}

export async function getSubCategoryById(id){
    return await axios.get(`${hosturl}/api/SubCategory/${id}`);
}

export async function postSubCategory(subCategory){
    return await axios.post(`${hosturl}/api/SubCategory`,subCategory);
}

export async function putSubCategory(id,subCategory){
    return await axios.put(`${hosturl}/api/SubCategory/${id}`,subCategory);
}

export async function deleteSubCategory(id){
    return await axios.delete(`${hosturl}/api/SubCategory/${id}`);
}