import React, { useEffect, useState } from "react";
import { dataService } from "../../shared/RxJsState";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../services/LoginService";
import "./Profile.css";

export default function Profile(){

    const [user,setUser] = useState();
    useEffect(() => {
        dataService.getData().subscribe({
            next : (value) => {
                setUser(value);
            }
        })
    })

    return (
        <div>
            <div className="background border">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col col-lg-3">
                            <div className="bg-white shadow-sm p-2">
                                <div className="row">
                                    <div className="col col-lg-3">
                                        <img src="../../assets/images/user-logo.png" width={60} height={60} alt="" />
                                    </div>
                                    <div className="col col-lg-9 py-1">
                                        <p className="mb-0 fs-6">Hello</p>
                                        <p className="">{user?.firstName.concat(" ",user?.lastName)}</p>
                                    </div>
                                </div>
                                <hr className="mt-1 mb-2"/>
                                <NavLink to="edit-profile" className="mb-0 alink"><i className="fa-solid fa-pen-to-square"></i>Edit Account</NavLink><br />
                            </div>
                            <div className="bg-white shadow-sm p-2 mt-3">
                                <NavLink to="wishlist" className="mb-0 alink">Wishlist</NavLink><br />
                                <NavLink className="mb-0 logout-btn" onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</NavLink>
                            </div>
                        </div>
                        <div className="col col-lg-9">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}