import React, { useEffect, useState } from "react";
import './Product.css';
import { getProductsByQuery } from "../services/ProductService";
import { NavLink, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Product() {

    useEffect(() => {
        getProducts();
    }, [])

    
    const [searchParams] = useSearchParams();
    const itemName = searchParams.get('itemName');

    const [productList, setProductList] = useState([]);
    async function getProducts() {
        return await getProductsByQuery(itemName).then((response) => {
            const data = response.data;
            setProductList(data);
        }).catch((error) => {
            toast.error('Server Error', {
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
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

    const arrayList = [];
    var clonedList = [];
    async function filterByPrice(){
        await getProductsByQuery(itemName).then((response) => {
            const data = response.data;
            console.log("Data =",data);
            clonedList = data;
        })
        if((document.getElementById('price1')).checked)
        {
            clonedList.filter(price => price.discountedPrice <= 10000).map(filteredPrice => {
                arrayList.push(filteredPrice);
            })
        }
        if((document.getElementById('price2')).checked)
        {
            clonedList.filter(price => price.discountedPrice > 10000 && price.discountedPrice <= 30000).map(filteredPrice => {
                arrayList.push(filteredPrice);
            })
        }
        if((document.getElementById('price3')).checked)
        {
            clonedList.filter(price => price.discountedPrice > 30000).map(filteredPrice => {
                arrayList.push(filteredPrice);
            })
        }
        console.log("array =",arrayList);
        if(arrayList)
        {
            setProductList(arrayList);
        }
        // if(arrayList !== null)
        // {

        // }
        if(arrayList.length < 1)
        {
            console.log("cloned =",clonedList)
            setProductList(clonedList);
        }
        // setProductList(arrayList);
    }

    // price range under 10,000
    // let price1_check = document.getElementById('price1');
    // price1_check?.addEventListener('change',function(){
    //     if(price1_check.checked)
    //     {
    //         const clonedList = [...productList];
    //         clonedList.forEach((item) => {
    //             if(item.discountedPrice > 10000)
    //             {
    //                arrayList.push(item);
    //             }
    //         })
    //         setProductList(arrayList);
    //     }
    //     else
    //     {
    //         getProducts();
    //     }
    // })

    // price range between 10,000 and 30,000
    // let price2_check = document.getElementById('price2');
    // price2_check?.addEventListener('change',function(){
    //     if(price2_check.checked)
    //     {
    //         const clonedList = [...productList];
    //         clonedList.forEach((item) => {
    //             if(item.discountedPrice <= 30000)
    //             {
    //                arrayList.push(item);
    //             }
    //         })
    //         setProductList(arrayList);
    //     }
    //     else
    //     {
    //         getProducts();
    //     }
    // })

    // price range between 10,000 and 30,000
    // let price3_check = document.getElementById('price3');
    // price3_check?.addEventListener('change',function(){
    //     if(price3_check.checked)
    //     {
    //         const clonedList = [...productList];
    //         clonedList.forEach((item) => {
    //             if(item.discountedPrice > 30000)
    //             {
    //                arrayList.push(item);
    //             }
    //         })
    //         setProductList(arrayList);
    //     }
    //     else
    //     {
    //         getProducts();
    //     }
    // })

    return (
        <div>
            <div className="container mt-1">
                <nav
                    aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active"><NavLink to="/" className="link">Furniture</NavLink></li>
                        <li className="breadcrumb-item" aria-current="page">{itemName}</li>
                        {/* <li className="breadcrumb-item active" aria-current="page">Fabric Sofas</li> */}
                    </ol>
                </nav>
                <div className="text-center">
                    <p className="heading mb-0">{itemName}</p>
                    <p>{itemName} are the perfect addition to the home décor because they never fail to add that extra glamour.</p>
                    {/* <img src="../../assets/images/logo.svg" alt="" height={200} width={200} /> */}
                </div>
            </div>
            <div className="product-main container-fluid">
                <div className="row mx-2">
                    <div className="col col-lg-2 p-2">
                        <div className="bg-white">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Sort by
                                        </button>
                                        <hr className="mt-1 mb-0" />
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div>
                                                <input type="radio" value="Name" name="products" onClick={sortbyName} />
                                                <span className="ms-2">Sort (A-Z)</span>
                                            </div>
                                            <div>
                                                <input type="radio" value="LTH" name="products" onClick={sortByPriceLowToHigh} />
                                                <span className="ms-2">Price (Low to High)</span>
                                            </div>
                                            <div>
                                                <input type="radio" value="HTL" name="products" onClick={sortByPriceHighToLow} />
                                                <span className="ms-2">Price (High to Low)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white mt-2">
                            <div className="accordion" id="accordionExample2">
                                <div className="accordion-item">
                                    <p className="mx-3 my-2">Filter</p>
                                    <hr className="mt-1" />
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button border-0 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            PRICE RANGE
                                        </button>
                                        <hr className="mt-1 mb-0" />
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample2">
                                        <div className="accordion-body">
                                            <div>
                                                <input type="checkbox" id="price1" onClick={filterByPrice} />
                                                <span className="ms-2">Under Rs 10,000</span>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="price2" onClick={filterByPrice} />
                                                <span className="ms-2">Rs 10,000 - Rs 30,000</span>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="price3" onClick={filterByPrice} />
                                                <span className="ms-2">Over Rs 30,000</span>
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
                                    <NavLink to={`/products/${product.productId}`} style={{ textDecoration: "none", color: "black" }}>
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
                                    </NavLink>
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