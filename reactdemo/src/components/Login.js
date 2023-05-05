import React, { useState } from "react";
import './Login.css';
import { NavLink } from "react-router-dom";
import postLogin from "../services/LoginService";
import { useForm } from "react-hook-form";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { dataService } from "../shared/RxJsState";

export default function Login(){

    const { register, handleSubmit, reset, formState:{errors} } = useForm();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onsubmit = (data) => {
        let obj = {
            email : email,
            password : password
        };

        login(obj);
        reset(data.values);
    }

    function login(data){
        postLogin(data).then((response) => {
            if(response)
            {
                const token = response.data;
                if(token)
                {
                    localStorage.setItem("token",JSON.stringify(token));
                    dataService.setData(token);
                }
                toast.success('Successfully logged in',{
                    position:"bottom-right",
                    autoClose: 1000,
                    style:{fontSize:"14px"}
                })
                
                if(token.role === "Admin")
                {
                    navigate('/admin');
                }
                if(token.role === "User")
                {
                    navigate('/');
                }
            }
        }).catch((error) => {
            if(error.response)
            {
                if(error.response.status === 401)
                {
                    toast.error('Invalid Credentials',{
                        position:"bottom-right",
                        autoClose: 1000,
                        style:{fontSize:"14px"}
                    })
                }
            }
        })
    }

    //const areFieldsFilled = (email !== "") && (password !== "")

    return(
        <div>
            <div className="container login">
                <div className="d-flex flex-row w-100">
                    <div className="">
                        <img src="../../assets/images/login-image.jpg" className="login-img" width="370px" height="540px" alt="" />
                    </div>
                    <div className="w-50 ms-2">
                        <NavLink className="float-end" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20.448 20.408">
                            <g transform="translate(0 0)">
                                <path
                                d="M20.448,1.786,19.263.6,10.224,9.624,1.185.6,0,1.786l9.039,9.021L0,19.828l1.185,1.183,9.039-9.021,9.039,9.021,1.185-1.183-9.039-9.021Z"
                                transform="translate(0 -0.603)" fill="#000">
                                </path>
                            </g>
                            </svg>
                        </NavLink>
                        <div>
                            <h5 className="mt-4 mb-0">Login</h5>
                            <p className="login-text">Track your order, create wishlist & more</p>
                            <form onSubmit={handleSubmit(onsubmit)}>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={`form-control rounded-0 text-size p-2 border border-1 border-gray-900 ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Email ID"
                                        id="email"
                                        {...register
                                            ('email',
                                                {
                                                    required:{value:true,message:"Field is required"},
                                                    pattern:{value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:"Invalid email"},
                                                    onChange:(e) => setEmail(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.email && <p className="text-danger small-font">{errors.email.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className={`form-control rounded-0 text-size p-2 border border-1 border-gray-900 ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Password"
                                        id="password"
                                        {...register
                                            ('password',
                                                {
                                                    required:{value:true,message:"Field is required"},
                                                    minLength:{value:6,message:"Please provide 6 characters"},
                                                    maxLength:{value:20,message:"Can't exceed more than 20 characters"},
                                                    onChange:(e) => setPassword(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.password && <p className="text-danger small-font">{errors.password.message}</p>}
                                </div>  
                                <div>
                                    <p className="fontsize">Forgot Password? <NavLink className="orange-color float-end" to="/">LOGIN USING OTP</NavLink></p>
                                    <button type="submit" className="orange-bg border-0 text-white w-100 rounded-1 fw-semibold mt-1">LOG IN</button>
                                    {/* {areFieldsFilled &&
                                    }
                                    {!areFieldsFilled && 
                                        <button type="submit" className="grey-bg border-0 text-white w-100 rounded-1 fw-semibold mt-1" disabled>LOG IN</button>
                                    } */}
                                    <p className="fontsize mt-4 text-center">New to Woodenstreet? <NavLink className="orange-color alink" to="/signup">Register Here</NavLink></p>
                                </div>
                            </form>
                        </div>
                        <div>
                            <p className="text-center fs-6">
                                OR Continue With
                                <img src="../../assets/images/googleplus.svg" alt="" />
                                <img src="../../assets/images/facebook.svg" height="28px" className="ms-2" alt="" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}