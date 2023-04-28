import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function deleteImage(productId){
    return await axios.delete(`${hosturl}/api/Image/${productId}`);
}