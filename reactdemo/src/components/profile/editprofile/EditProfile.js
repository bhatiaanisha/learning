import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUserById, putUser } from "../../../services/UserService";
import "./EditProfile.css"
import { toast } from "react-toastify";
import { dataService } from "../../../shared/RxJsState";

export default function EditProfile(){

    useEffect(() => {
        dataService.getData().subscribe({
            next : (value) => {
                getAUser(value?.userId);
            }
        })
    },[]);

    const { register } = useForm();

    const [user, setUser] = useState();
    async function getAUser(id){
        return await getUserById(id).then((response) => {
            const userData = response.data;
            setUser(userData);
        })
    }

    const [userDetails, setUserDetails] = useState({
        userId : 0,
        firstName : '',
        lastName : '',
        mobileNumber : 0,
        email : 0
    })

    async function updateUser(e){
        e.preventDefault();
        let UserEditForm = {
            userId : user.userId,
            firstName : userDetails.firstName ? userDetails.firstName : user.firstName,
            lastName : userDetails.lastName ? userDetails.lastName : user.lastName,
            mobileNumber : userDetails.mobileNumber ? userDetails.mobileNumber : user.mobileNumber,
            email : userDetails.email ? userDetails.email : user.email,
            passwordHash : user.passwordHash,
            passwordSalt : user.passwordSalt,
            userType : user.userType
        }
        return await putUser(UserEditForm.userId,UserEditForm).then(() => {
            toast.success('Your Profile Updated Successfully',{
                position:"bottom-right",
                autoClose:1000,
                style:{fontSize:"14px"}
            })
            getAUser(UserEditForm.userId);
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000
            })
        })
    }

    return (
        <div>
            <div className="bg-white shadow-sm px-3">
                <div>
                    <p className="fs-5 py-2 mb-0">My Account</p>  
                    <hr className="mt-2" />
                    <div>
                        <form>
                            <div className="row gap-2">
                                <div className="col col-lg-5">
                                    <div>
                                        <label htmlFor="firstName" className="text fw-medium">First Name</label><br />
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="firstName" 
                                            defaultValue={user?.firstName}
                                            {...register
                                                ('firstName',
                                                    {
                                                        onChange: (e) => setUserDetails({...userDetails, firstName: e.target.value})
                                                    }
                                                )
                                            }
                                        />
                                        {/* {errors.firstName && <p className="text-danger small-font">{errors.firstName.message}</p>} */}
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="email" className="text fw-medium">Email Address</label><br />
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="email" 
                                            defaultValue={user?.email} 
                                            disabled 
                                            {...register
                                                ('email',
                                                    {
                                                        onChange: (e) => setUserDetails({...userDetails, email: e.target.value})
                                                    }
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col col-lg-5">
                                    <div>
                                        <label htmlFor="lastName" className="text fw-medium">Last Name</label><br />
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="lastName" 
                                            defaultValue={user?.lastName} 
                                            {...register
                                                ('lastName',
                                                    {
                                                        onChange: (e) => setUserDetails({...userDetails, lastName: e.target.value})
                                                    }
                                                )
                                            }
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="mobileno" className="text fw-medium">Mobile Number</label><br />
                                        <input 
                                            type="text"
                                            className="form-control" 
                                            id="mobileNumber" 
                                            defaultValue={user?.mobileNumber} 
                                            {...register
                                                ('mobileNumber',
                                                    {
                                                        onChange: (e) => setUserDetails({...userDetails, mobileNumber: e.target.value})
                                                    }
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn-color text-white border-0 mt-4 rounded-1 px-5 py-2" onClick={updateUser}>Update</button>
                        </form>
                    </div>
                </div>
                <div className="mt-5">
                    <p className="fs-5 py-2 mb-0">Change Password</p>
                    <hr className="mt-2" />
                    <div>
                        <form>
                            <div className="row">
                                <div className="col col-lg-5">
                                    <div>
                                        <label htmlFor="password" className="text fw-medium">Password</label><br />
                                        <input type="password" className="form-control" id="password" />
                                    </div>
                                </div>
                                <div className="col col-lg-5">
                                    <div>
                                        <label htmlFor="cnfPassword" className="text fw-medium">Confirm Password</label><br />
                                        <input type="password" className="form-control" id="cnfPassword" />
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn-color text-white border-0 mt-4 rounded-1 px-3 py-2 mb-2">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}