import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function getCategory(){
    return await axios.get(`${hosturl}/api/Category`);
}

export async function getCategoryById(categoryId){
    return await axios.get(`${hosturl}/api/Category/${categoryId}`);
}

export async function postCategory(category){
    return await axios.post(`${hosturl}/api/Category`,category);
}

export async function putCategory(category){
    return await axios.put(`${hosturl}/api/Category/${category.categoryId}`,category);
}

export async function deleteCategory(categoryId){
    return await axios.delete(`${hosturl}/api/Category/${categoryId}`);
}