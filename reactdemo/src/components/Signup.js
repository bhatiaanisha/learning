import React,{useState} from "react";
import { Link } from "react-router-dom";
import './Signup.css';
import { postRegister } from "../services/UserService";
import { useForm } from "react-hook-form";
import { ToastContainer,toast } from "react-toastify";

export default function Signup(){

    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    const [name, setName] = useState('');
    const [mobileno, setMobileNo] = useState('');
    const [pincode, setPincode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onsubmit = (data) => {
        let obj = {
            userName : name,
            mobileNumber : mobileno,
            pinCode : pincode,
            email : email,
            password : password
        };
        RegisterUser(obj);
        reset(data.values);
    }
        
    //const areFieldsFilled = (name !== "") && (mobileno !== "") && (pincode !== "") && (email !== "") && (password !== "")

    async function RegisterUser(data){
        return await postRegister(data).then(() => {
            toast.success('Registered Successfully',{
                position:"bottom-right"
            })
            //alert("Registered Successfully!");
        }).catch((error) => {
            toast.error('Error',{
                position:"bottom-right"
            })
            console.log("Error =",error);
        })
    }    

    return(
        <div>
            <div className="container signUp">
                <div className="d-flex flex-row">
                    <div className="">
                        <img src="../../assets/images/register-image.jpg" className="signup-img" width="370px" height="570px" alt="" />
                    </div>
                    <div className="ms-2">
                        <a className="float-end" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20.448 20.408">
                            <g transform="translate(0 0)">
                                <path
                                d="M20.448,1.786,19.263.6,10.224,9.624,1.185.6,0,1.786l9.039,9.021L0,19.828l1.185,1.183,9.039-9.021,9.039,9.021,1.185-1.183-9.039-9.021Z"
                                transform="translate(0 -0.603)" fill="#000">
                                </path>
                            </g>
                            </svg>
                        </a>
                        <h5 className="mt-4 mb-0">Register</h5>
                        <p className="register-text">Get exclusive discounts, newsletters and more</p>
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="mb-1">
                                <input 
                                    type="text" 
                                    className={`form-control rounded-0 text-size p-2 border border-1 border-gray-900 ${errors.name ? 'is-invalid' : ''}`} 
                                    placeholder="Name" 
                                    id="name"
                                    {...register
                                        ('name',
                                            {
                                                required:{value:true,message:"Field is required"},
                                                pattern:{value:/^[A-Za-z]+$/,message:"Only alphabets are allowed"},
                                                onChange:(e) => setName(e.target.value)
                                            }
                                        )
                                    }
                                />
                                {errors.name && <p className="text-danger small-font">{errors.name.message}</p>}
                            </div>
                            <div className="d-flex flex-row mb-1">
                                <div>
                                    <input 
                                        type="text" 
                                        className={`form-control rounded-0 text-size p-2 border border-1 border-gray-900 ${errors.mobileno ? 'is-invalid' : ''}`}
                                        placeholder="Mobile No." 
                                        id="mobileno"
                                        {...register
                                            ('mobileno',
                                                {
                                                    required:{value:true,message:"Field is required"},
                                                    pattern:{value:/^[0-9+-]+$/,message:"Only Digits are allowed"},
                                                    minLength:{value:10,message:"Mobile no must be 10 digits"},
                                                    maxLength:{value:10,message:"Mobile no must be 10 digits"},
                                                    onChange:(e) => setMobileNo(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.mobileno && <p className="text-danger small-font">{errors.mobileno.message}</p>}
                                </div>
                                <div className="ms-2">
                                    <input 
                                        type="text" 
                                        className={`form-control rounded-0 text-size p-2 border border-1 border-gray-900 me-2 ${errors.pincode ? 'is-invalid' : ''}`} 
                                        placeholder="Pin Code"
                                        id="pincode"
                                        {...register
                                            ('pincode',
                                                {
                                                    required:{value:true,message:"Field is required"},
                                                    pattern:{value:/^[0-9+-]+$/,message:"Only Digits are allowed"},
                                                    minLength:{value:6,message:"Pincode must be 6 digits"},
                                                    maxLength:{value:6,message:"Pincode must be 6 digits"},
                                                    onChange:(e) => setPincode(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.pincode && <p className="text-danger small-font">{errors.pincode.message}</p>}
                                </div>
                            </div>
                            <div className="mb-1">
                                <input 
                                    type="text" 
                                    className={`form-control rounded-0 text-size p-2 border border-1 border-gray-900 ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email Address"
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
                            <div className="mb-1">
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
                                <p className="small-font mt-4 text-center">By continuing, I agree to the <span className="orange-color">Terms of Use</span> & <span className="orange-color">Privacy Policy</span></p>
                                <button type="submit" className="orange-bg border-0 text-white w-100 rounded-1 fw-semibold">CONTINUE</button>
                                {/* {!areFieldsFilled &&
                                    <button type="submit" className="grey-bg border-0 text-white w-100 rounded-1 fw-semibold" disabled>CONTINUE</button>
                                } */}
                                <p className="small-font mt-4 text-center mb-3">Already have an account? <Link to="/login" className="orange-color alink">Sign in</Link></p>
                            </div>
                        </form>
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