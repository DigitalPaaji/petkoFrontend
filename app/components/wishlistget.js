import axios from "axios"
import { baseurl } from "../admin/components/apis"

export const fetchWishlist=async()=>{

        const response = await axios.get(`${baseurl}/wishlist/getwishlist`);
        const data = await response.data;
        if(data.success){
            return data.data
        }

   
}
