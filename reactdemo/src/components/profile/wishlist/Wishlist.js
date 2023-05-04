import React, { useEffect, useState } from "react";
import './Wishlist.css';
import { NavLink } from "react-router-dom";
import { getWishlist } from "../../../services/WishlistService";
import { dataService } from "../../../shared/RxJsState";

export default function Wishlist(){

    useEffect(() => {
        dataService.getData().subscribe({
            next : (value) => {
                getWishlistDataByUserId(value?.userId);
            }
        })
    },[]);

    const [isWishlist, setIsWishlist] = useState(false);

    const [wishlistData, setWishlistData] = useState();
    function getWishlistDataByUserId(userId){
        getWishlist(userId).then((response) => {
            const data = response.data
            if(data.length > 0)
            {
                setIsWishlist(true)
                setWishlistData(data)
            }
        })
    }

    return (
        <div className="bg-white shadow-sm px-3 py-3">
            <p className="fs-5">Wishlist</p>
            <hr />
            {!isWishlist && 
                <div>
                    <img src="../../assets/images/blank-wishlist.svg" className="mx-auto d-block mt-5 mb-4" height={150} width={200} alt="" />
                    <p className="text-center font fs-6">You Haven't Added Any Item To Your Wishlist</p>
                    <button className="mx-auto d-block rounded px-3 py-1 mt-2 text-uppercase bg-orange border-0">
                        <NavLink to="/" className="text-decoration-none text-white">
                            Start Exploring
                        </NavLink>
                    </button>
                </div>
            }
            {isWishlist &&
                <div className="row ">
                    {wishlistData?.map((wishlist,i) => 
                        <div key={i} className="col">
                            <div className="d-flex gap-5">
                                <img src={wishlist?.productImageUrl} alt="" height={100} width={100} />
                                <span className="my-auto fw-semibold">
                                    {wishlist?.productName.split('(')[0]}
                                    <p className="font fw-lighter">SKU: {wishlist?.sku}</p>
                                </span>
                                <span className="my-auto fw-semibold">
                                    Rs {wishlist?.discountedPrice.toLocaleString()} 
                                    <span className="font ms-2 text-success">{((wishlist?.originalPrice - wishlist?.discountedPrice) * 100 / wishlist?.originalPrice).toFixed(0)}% Off</span>
                                    <p className="text-decoration-line-through fw-lighter font">Rs {wishlist?.originalPrice.toLocaleString()}</p> 
                                </span>
                                <button type="button" className="my-auto bg-orange text-white px-3 border-0 rounded py-1">Move to Cart</button>
                                <button type="button" className="border-0 bg-white"><i className="fa-solid fa-trash-can my-auto fs-4"></i></button>
                            </div>
                            <hr />
                        </div>
                    )}
                </div>
            }
        </div>
    );
}