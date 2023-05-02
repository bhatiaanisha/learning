import axios from "axios";
import { environment } from "../environment";

const hosturl = environment.appurl;

export async function getWishlist(userId){
    return await axios.get(`${hosturl}/api/Wishlist/data/${userId}`);
}