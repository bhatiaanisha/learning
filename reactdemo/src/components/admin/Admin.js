import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Admin(){
    return(
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                                <li className="nav-item">
                                    <em className="fa-solid fa-gear fa-2x"><span className="fs-2" style={{fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif'}}>Admin</span></em>
                                </li>
                                <li className="nav-item mt-5 fs-5">
                                    <button className="dropdown-item" type="button"><Link to="category" className="text-white text-decoration-none">Category</Link></button>
                                </li>
                                <li className="nav-item mt-5 fs-5">
                                    <button className="dropdown-item" type="button"><Link to="sub-category" className="text-white text-decoration-none">SubCategory</Link></button>
                                </li>
                                <li className="nav-item mt-5 fs-5">
                                    <button className="dropdown-item" type="button"><Link to="admin-products" className="text-white text-decoration-none">Products</Link></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col py-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}