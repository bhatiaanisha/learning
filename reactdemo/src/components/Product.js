import React, { useEffect, useState } from "react";
import './Product.css';
import { getAllProducts } from "../services/ProductService";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Product() {

    useEffect(() => {
        getProducts();
    }, [])

    const [productList, setProductList] = useState([]);
    async function getProducts() {
        return await getAllProducts().then((response) => {
            const data = response.data;
            setProductList(data);
        }).catch((error) => {
            toast.error('Server Error', {
                position: "bottom-right",
                autoClose: 1000
            })
            console.log(error);
        })
    }

    function sortbyName(){
        const clonedList = [...productList];
        clonedList.sort((a,b) => {
            if(a.productName > b.productName)
            {
                return 1;
            }
            else if(a.productName < b.productName)
            {
                return -1;
            }
            return 0;
        });
        setProductList(clonedList);
    }
    
    function sortByPriceLowToHigh(){
        const clonedList = [...productList];
        clonedList.sort((a,b) => {
            return a.discountedPrice - b.discountedPrice;
        })
        setProductList(clonedList);
    }

    function sortByPriceHighToLow(){
        const clonedList = [...productList];
        clonedList.sort((a,b) => {
            return b.discountedPrice - a.discountedPrice;
        })
        setProductList(clonedList);
    }

    return (
        <div>
            <div className="container mt-1">
                <nav
                    aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">Furniture</li>
                        <li className="breadcrumb-item active" aria-current="page">Sofas</li>
                        <li className="breadcrumb-item active" aria-current="page">Fabric Sofas</li>
                    </ol>
                </nav>
                <div className="text-center">
                    <p className="heading mb-0">Fabric Sofas</p>
                    <p>Fabric sofa sets are the perfect addition to the home décor because they never fail to add that extra glamour.</p>
                    <img src="../../assets/images/fabric_sofa.png" alt="" />
                </div>
            </div>
            <div className="product-main container-fluid">
                <div className="row mx-2">
                    <div className="col col-lg-2 p-2">
                        <div className="bg-white">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Sort by
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div className="">
                                                <input type="radio" value="Name" name="products" onClick={sortbyName} />
                                                <span className="ms-2">Sort (A-Z)</span>
                                            </div>
                                            <div className="">
                                                <input type="radio" value="LTH" name="products" onClick={sortByPriceLowToHigh} />
                                                <span className="ms-2">Price (Low to High)</span>
                                            </div>
                                            <div className="">
                                                <input type="radio" value="HTL" name="products" onClick={sortByPriceHighToLow} />
                                                <span className="ms-2">Price (High to Low)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-10 p-2">
                        <div className="row m-1 gap-2">
                            {productList.map((product, i) =>
                                <div key={i} className="card border-0 shadow col-md-3 p-2 card-width bg-white">
                                    <Link to={`/products/${product.productId}`} style={{ textDecoration: "none", color: "black" }}>
                                        <div className="card rounded-0 border-0">
                                            <img src={product.productImageUrl} className="cursor" alt="" />
                                            <div className="card-body card-bottom">
                                                <p className="cardbody-margin">{product.productName}</p>
                                                <p className="grey-color">{product.companyName}</p>
                                                {product.isRated &&
                                                    <div className="orange">
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <span className="ms-2 text-black-50">[{product.ratings}]</span>
                                                    </div>
                                                }
                                                <hr className="hr-margin" />
                                                <p className="price fw-bold">Rs {product.discountedPrice.toLocaleString()} <span className="fw-lighter ms-2 fs-6 strikethrough">Rs {product.originalPrice.toLocaleString()}</span> <span className="fs-6 fw-semibold ms-2 orange-color">{((product.originalPrice - product.discountedPrice) * 100 / product.originalPrice).toFixed(0)}% off</span></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}