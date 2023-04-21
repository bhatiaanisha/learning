import React from "react";
import "./EditProfile.css"

export default function EditProfile(){
    return (
        <div className="background border border-1 border-dark">
            <div className="container mt-5">
                <div className="row">
                    <div className="col col-lg-3">
                        <div className="bg-white shadow-sm p-2 border border-1 border-success">
                            <div className="row">
                                <div className="col col-lg-3">
                                    <img src="../../assets/images/user-logo.png" width={60} height={60} alt="" />
                                </div>
                                <div className="col col-lg-9 py-1">
                                    <p className="mb-0 fs-6">Hello</p>
                                    <p className="">Anisha Bhatia</p>
                                </div>
                            </div>
                            <hr className="mt-1 mb-2"/>
                            <a href="/edit-profile" className="mb-0 alink"><i class="fa-solid fa-pen-to-square"></i>Edit Account</a>
                        </div>
                    </div>
                    <div className="col col-lg-9">
                        <div className="bg-white shadow-sm px-3">
                            <p className="fs-5 py-2 mb-0">My Account</p>
                            <hr className="mt-2" />
                            <div>
                                <div className="row">
                                    <form>
                                        <div className="col col-lg-4">
                                            <div>
                                                <label htmlFor="firstName" className="text fw-medium">First Name</label><br />
                                                <input type="text" className="form-control" id="firstName" value={"Anisha"} />
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="email" className="text fw-medium">Email Address</label><br />
                                                <input type="text" className="form-control" id="email" value={"anishabhatia555@gmail.com"} disabled />
                                            </div>
                                        </div>
                                        <div className="col col-lg-4">
                                            <div>
                                                <label htmlFor="lastName" className="text fw-medium">Last Name</label><br />
                                                <input type="text" className="form-control" id="lastName" value={"Anisha"} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}