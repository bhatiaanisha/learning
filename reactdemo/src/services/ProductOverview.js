import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function deleteProductOverview(productId){
    return await axios.delete(`${hosturl}/api/ProductOverview/${productId}`);
}