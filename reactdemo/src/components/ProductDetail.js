import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import './ProductDetail.css';
import { getProductDetailsById } from "../services/ProductService";
import { ToastContainer,toast } from "react-toastify";

export default function ProductDetail(){
     
    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line
    },[])

    const [productDetails, setProductDetails] = useState([]);
    const params = useParams();
    const productId = Object.values(params)[0]; 

    async function getProductDetails(){
        return await getProductDetailsById(productId).then((response) => {
            console.log(response);
            const data = response.data;
            setProductDetails(data);
        }).catch((error) => {
            toast.error('Server Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
            console.log(error);
        })
    }

    return(
        <div>
            <div className="container mt-2">
                <div>
                    <nav
                        aria-label="breadcrumb">
                        <ol className="breadcrumb font-size">
                            <li className="breadcrumb-item active">Furniture</li>
                            <li className="breadcrumb-item active" aria-current="page">Sofas</li>
                            <li className="breadcrumb-item active" aria-current="page">Fabric Sofas</li>
                            <li className="breadcrumb-item active" aria-current="page">Product</li>
                        </ol>
                    </nav>
                </div>
                {productDetails.map((productDetail,i) =>      
                    <div className="row" key={i}>
                        <div className="col-lg-6">
                            <div className="row">
                                <img src={productDetail.productImageUrl} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <p className="fw-bold fs-5 mb-0">{productDetail.productName.split('(')[0]}</p>
                                <p className="grey-color mb-2 ms-0">{productDetail.productName.split('(')[1] ? productDetail.productName.split('(')[1].split(')')[0] : null}</p>
                                <div className="row mb-4">
                                    <div className="col-1">
                                        <span className="badge badge-color">
                                        <i className="fa-solid fa-star"></i>
                                        </span>
                                    </div>
                                    <div className="col-5">
                                        <span>{productDetail.ratings} Ratings & {productDetail.reviews} Reviews</span>
                                    </div>
                                    <div className="col">
                                        <NavLink className="cursor" to="/">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                d="M11.4861 18.2086L18.4499 11.2449C20.1609 9.53387 20.4133 6.71893 18.7941 4.92075C18.3885 4.46904 17.8951 4.10469 17.3441 3.84995C16.793 3.59521 16.1959 3.45542 15.589 3.4391C14.9821 3.42278 14.3783 3.53028 13.8143 3.75503C13.2504 3.97979 12.7382 4.31709 12.3089 4.74636L11 6.05522L9.86993 4.92515C8.15889 3.21409 5.34395 2.96166 3.54577 4.58089C3.09405 4.98648 2.72971 5.47986 2.47497 6.03091C2.22023 6.58196 2.08043 7.17914 2.06412 7.78601C2.0478 8.39287 2.15529 8.9967 2.38005 9.56065C2.6048 10.1246 2.94211 10.6368 3.37137 11.0661L10.5139 18.2086C10.6428 18.3376 10.8177 18.41 11 18.41C11.1823 18.41 11.3572 18.3376 11.4861 18.2086V18.2086Z"
                                                stroke="#646464" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            Add To Wishlist
                                        </NavLink>
                                    </div>
                                </div>
                                <p className="fw-bold fs-3 mb-1">Rs {productDetail.discountedPrice.toLocaleString()} <span className="strikethrough fw-lighter fs-6">Rs {productDetail.originalPrice.toLocaleString()}</span> <span className="fs-6 text-success fw-semibold ms-2">{((productDetail.originalPrice - productDetail.discountedPrice) * 100 / productDetail.originalPrice).toFixed(0)}% off</span></p>
                                <img src="../../assets/images/coupon.jpg" alt="" /> 
                                <div className="mb-3">
                                    <p className="mt-2 fs-5 orange-color">Special offers</p>
                                    <p className="font-size mb-2">
                                        <img src="../../assets/images/green-arrow.svg" alt="" />
                                        <span className="fw-semibold ms-2">Spring Sale</span> 
                                        - Apply Coupon SPRING23 & Get 20% Off (price inclusive of discount) 
                                        <NavLink to="/" className="alink">T&C</NavLink>
                                    </p>
                                    <p className="font-size mb-2">
                                        <img src="../../assets/images/green-arrow.svg" alt="" />
                                        <span className="fw-semibold ms-2">Store Discount</span> 
                                        - Get upto 10% off on orders placed at your nearest experience stores 
                                        <NavLink to="/" className="alink">T&C</NavLink>
                                    </p>
                                    <p className="font-size mb-2">
                                        <img src="../../assets/images/green-arrow.svg" alt="" />
                                        <span className="fw-semibold ms-2">UPI Payment Offer</span> 
                                        - Get 1% Instant Discount Online On UPI Payments 
                                        <NavLink to="/" className="alink">T&C</NavLink>
                                    </p>
                                    <p className="font-size">
                                        <img src="../../assets/images/green-arrow.svg" alt="" />
                                        <span className="fw-semibold ms-2">No Cost EMI - Starting from Rs 3,482</span> 
                                        on ICICI, Axis, Kotak, HDFC, SBI & 
                                        <NavLink to="/" className="alink">More</NavLink>
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <button type="button" className="p-2 btn-cart text-white fw-bold fs-5 border-0 rounded-1">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.21875 22.8802C8.04718 22.8802 8.71875 22.2086 8.71875 21.3802C8.71875 20.5518 8.04718 19.8802 7.21875 19.8802C6.39032 19.8802 5.71875 20.5518 5.71875 21.3802C5.71875 22.2086 6.39032 22.8802 7.21875 22.8802Z"
                                            fill="#FFFDF2"></path>
                                        <path
                                            d="M18.4688 22.8802C19.2972 22.8802 19.9688 22.2086 19.9688 21.3802C19.9688 20.5518 19.2972 19.8802 18.4688 19.8802C17.6403 19.8802 16.9688 20.5518 16.9688 21.3802C16.9688 22.2086 17.6403 22.8802 18.4688 22.8802Z"
                                            fill="#FFFDF2"></path>
                                        <path
                                            d="M4.10547 6.38019H20.4569C20.5667 6.38019 20.6753 6.40432 20.7748 6.45087C20.8742 6.49743 20.9623 6.56527 21.0327 6.6496C21.1031 6.73393 21.1541 6.8327 21.1821 6.93891C21.2101 7.04513 21.2145 7.1562 21.1948 7.26428L19.5594 16.2643C19.528 16.4371 19.4369 16.5934 19.3021 16.706C19.1672 16.8185 18.9971 16.8802 18.8215 16.8802H6.64783C6.47226 16.8802 6.30225 16.8186 6.16742 16.7061C6.0326 16.5937 5.9415 16.4375 5.91 16.2647L3.53588 3.24564C3.50438 3.07291 3.41329 2.91671 3.27846 2.80425C3.14363 2.69179 2.97362 2.63019 2.79805 2.63019H1.10547"
                                            stroke="#FFFDF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        ADD TO CART
                                    </button>
                                    <button type="button" className="p-2 btn-buy text-white fw-bold fs-5 border-0 rounded-1 ms-2">
                                        <svg width="18" height="26" viewBox="0 0 18 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.6579 11.6438L9.30461 10.4571L12.1284 1.59157C12.1284 1.59157 12.1254 1.58752 12.1233 1.59061L2.60242 12.678L2.6019 12.6808L8.11342 13.7103L4.35386 23.5619C4.35386 23.5619 4.35762 23.5661 4.35898 23.5629L15.6618 11.6474L15.6579 11.6438Z"
                                            stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"></path>
                                        </svg>
                                        BUY NOW
                                    </button>
                                </div>
                                <p className="fs-5 fw-semibold mb-2">Product Overview</p>
                                <hr className="ms-2"></hr>
                                <div className="row grey-color">
                                    <div className="col-5">
                                        {productDetail.seater.length > 0 && <p>Seater</p>}
                                        {productDetail.material.length > 0 && <p>Material</p>}
                                        {productDetail.color.length > 0 && <p>Color</p>}
                                        {productDetail.dimensionsInInch.length > 0 && <p>Dimensions (Inch)</p>}
                                        {productDetail.mechanism.length > 0 && <p>Mechanism</p>}
                                        {productDetail.dimensionsInCm.length > 0 && <p>Dimensions (Cm)</p>}
                                        {productDetail.foam.length > 0 && <p>Foam</p>}
                                        {productDetail.weightCapacity.length > 0 && <p>Weight Capacity</p>}
                                        {productDetail.width.length > 0 && <p>Width</p>}
                                        {productDetail.warranty.length > 0 && <p>Warranty</p>}
                                        {productDetail.shipsIn.length > 0 && <p>Ships In</p>}
                                        {productDetail.deliveryCondition.length > 0 && <p>Delivery Condition</p>}
                                        {productDetail.sku.length > 0 && <p>SKU</p>}
                                    </div>
                                    <div className="col">
                                        {productDetail.seater.length > 0 && <p>{productDetail.seater}</p>}
                                        {productDetail.material.length > 0 && <p>{productDetail.material}</p>}
                                        {productDetail.color.length > 0 && <p>{productDetail.color}</p>}
                                        {productDetail.dimensionsInInch.length > 0 && <p>{productDetail.dimensionsInInch}</p>}
                                        {productDetail.mechanism.length > 0 && <p>{productDetail.mechanism}</p>}
                                        {productDetail.dimensionsInCm.length > 0 && <p>{productDetail.dimensionsInCm}</p>}
                                        {productDetail.foam.length > 0 && <p>{productDetail.foam}</p>}
                                        {productDetail.weightCapacity.length > 0 && <p>{productDetail.weightCapacity}</p>}
                                        {productDetail.width.length > 0 && <p>{productDetail.width}</p>}
                                        {productDetail.warranty.length > 0 && <p>{productDetail.warranty}</p>}
                                        {productDetail.shipsIn.length > 0 && <p>{productDetail.shipsIn}</p>}
                                        {productDetail.deliveryCondition.length > 0 && <p>{productDetail.deliveryCondition}</p>}
                                        {productDetail.sku.length > 0 && <p>{productDetail.sku}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}