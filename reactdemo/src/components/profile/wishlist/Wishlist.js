import React, { useState } from "react";
import './Wishlist.css';
import { NavLink } from "react-router-dom";

export default function Wishlist(){

    const [isWishlist, setIsWishlist] = useState(true);

    return (
        <div className="bg-white shadow-sm px-3 py-3">
            <p className="fs-5">Wishlist</p>
            <hr />
            {!isWishlist && 
                <div>
                    <img src="../../assets/images/blank-wishlist.svg" className="mx-auto d-block mt-5 mb-3" height={150} width={200} alt="" />
                    <p className="text-center font fs-6">You Haven't Added Any Item To Your Wishlist</p>
                    <button className="mx-auto d-block rounded px-3 py-1 text-uppercase orange-color border-0">
                        <NavLink to="/" className="text-decoration-none text-white">
                            Start Exploring
                        </NavLink>
                    </button>
                </div>
            }
            {isWishlist &&
                <div className="row ">
                    <div className="col">
                        <div className="d-flex gap-5">
                            <img src="https://firebasestorage.googleapis.com/v0/b/woodenstreet-d6ff2.appspot.com/o/uploads%2Ffabric_sofa1.jpg?alt=media&token=3d09b37d-ec5d-4119-946d-7b6df3bd10f3" alt="" height={100} width={100} />
                            <p className="my-auto fw-semibold">
                                Henry 3 Seater Sofa ...
                                <p className="font fw-lighter">SKU: WSFBS070OG19767</p>
                            </p>
                            <p className="my-auto fw-semibold">
                                Rs 38,989 
                                <span className="font ms-2 text-success">59% Off</span>
                                <p className="text-decoration-line-through fw-lighter font">Rs 94,999</p> 
                            </p>
                            <button type="button" className="my-auto orange-color text-white px-3 border-0 rounded py-1">Move to Cart</button>
                            <button type="button" className="border-0 bg-white"><i className="fa-solid fa-trash-can my-auto fs-4"></i></button>
                        </div>
                        <hr />
                    </div>
                    <div className="col">
                        <div className="d-flex gap-5">
                            <img src="https://firebasestorage.googleapis.com/v0/b/woodenstreet-d6ff2.appspot.com/o/uploads%2Ffabric_sofa1.jpg?alt=media&token=3d09b37d-ec5d-4119-946d-7b6df3bd10f3" alt="" height={100} width={100} />
                            <p className="my-auto fw-semibold">
                                Henry 3 Seater Sofa ...
                                <p className="font fw-lighter">SKU: WSFBS070OG19767</p>
                            </p>
                            <p className="my-auto fw-semibold">
                                Rs 38,989 
                                <span className="font ms-2 text-success">59% Off</span>
                                <p className="text-decoration-line-through fw-lighter font">Rs 94,999</p> 
                            </p>
                            <button type="button" className="my-auto orange-color text-white px-3 border-0 rounded py-1">Move to Cart</button>
                            <button type="button" className="border-0 bg-white"><i className="fa-solid fa-trash-can my-auto fs-4"></i></button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}