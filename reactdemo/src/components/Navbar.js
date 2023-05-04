import React, { useEffect, useState } from "react";
import { NavLink,Link } from "react-router-dom";
import './Navbar.css';
import { getFurnitureItems } from "../services/FurnitureItemsService"; 
import { ToastContainer,toast } from "react-toastify";
import { logout } from "../services/LoginService";
import { dataService } from "../shared/RxJsState";

export default function Navbar() {

    useEffect(()=>{
        getItems();
        dataService.getData().subscribe({
            next : (data) => {
                setUser(data);
            }
        })
    },[]);

    const [user,setUser] = useState();

    const [ItemList, setItemList] = useState([]);
    function getItems(){
        getFurnitureItems().then((response) => {
            const data = response.data;
            setItemList(data);
            return data;
        }).catch((error) => {
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000
            });
            console.log(error);
        })
    }

    return (
        <div>
            <div className="border-bottom">
                <nav className="navbar navbar-expand-lg m-0 p-3 color-yellow sticky-top">
                    <div className="container">
                        <div>
                            <svg className="svg-logo" width="23" height="20" viewBox="0 0 23 23" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.3711 12.0752C12.8899 12.0752 14.1211 10.844 14.1211 9.3252C14.1211 7.80641 12.8899 6.5752 11.3711 6.5752C9.85231 6.5752 8.62109 7.80641 8.62109 9.3252C8.62109 10.844 9.85231 12.0752 11.3711 12.0752Z"
                                    stroke="#333333" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                                <path
                                    d="M18.2461 9.3252C18.2461 15.5127 11.3711 20.3252 11.3711 20.3252C11.3711 20.3252 4.49609 15.5127 4.49609 9.3252C4.49609 7.50183 5.22042 5.75315 6.50973 4.46384C7.79905 3.17452 9.54773 2.4502 11.3711 2.4502C13.1945 2.4502 14.9431 3.17452 16.2325 4.46384C17.5218 5.75315 18.2461 7.50183 18.2461 9.3252V9.3252Z"
                                    stroke="#333333" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                            </svg>
                            <span className="store">Find a Store</span>
                            <span className="ms-1 text-size">- Enter Pincode
                                <NavLink>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.22559 14.7314H4.03809C3.89719 14.7314 3.76206 14.6754 3.66244 14.5758C3.56281 14.4761 3.50684 14.341 3.50684 14.2001V11.2327C3.50684 11.1629 3.52058 11.0938 3.54727 11.0294C3.57397 10.9649 3.6131 10.9063 3.66244 10.857L11.6312 2.88827C11.7308 2.78864 11.8659 2.73267 12.0068 2.73267C12.1477 2.73267 12.2829 2.78864 12.3825 2.88827L15.3499 5.85571C15.4496 5.95534 15.5055 6.09047 15.5055 6.23137C15.5055 6.37226 15.4496 6.50739 15.3499 6.60702L7.22559 14.7314Z"
                                        stroke="#F9763A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path d="M9.88184 4.6377L13.6006 8.35645" stroke="#F9763A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path d="M15.1947 14.7313H7.22597L3.54102 11.0464" stroke="#F9763A" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                    </svg>
                                </NavLink>
                            </span>
                        </div>
                        <div>
                            <svg width="15" height="15.069" viewBox="0 0 15 15.069">
                                <g transform="translate(-88.707 -12)">
                                    <g transform="translate(-1008 -51)">
                                    <path
                                        d="M2129.036,80.016a15.986,15.986,0,0,0,5.313,4.165,8.277,8.277,0,0,0,2.976.88c.072,0,.14.006.212.006a2.464,2.464,0,0,0,1.911-.821.066.066,0,0,0,.013-.016,7.993,7.993,0,0,1,.6-.624c.147-.14.3-.287.44-.437a1.507,1.507,0,0,0-.007-2.245l-1.876-1.877a1.52,1.52,0,0,0-1.1-.506,1.57,1.57,0,0,0-1.11.5l-1.117,1.117q-.151-.086-.309-.159a3.891,3.891,0,0,1-.343-.187,11.822,11.822,0,0,1-2.823-2.577,6.812,6.812,0,0,1-.952-1.523c.294-.266.569-.543.833-.815.094-.1.19-.194.287-.29a1.482,1.482,0,0,0,0-2.248l-.93-.93q-.16-.161-.317-.324c-.206-.212-.421-.431-.635-.627A1.557,1.557,0,0,0,2129,70a1.6,1.6,0,0,0-1.11.484l-1.166,1.168a2.4,2.4,0,0,0-.714,1.536,5.783,5.783,0,0,0,.434,2.5,14.537,14.537,0,0,0,2.593,4.33Zm-2.267-6.765a1.652,1.652,0,0,1,.5-1.062l1.162-1.159a.84.84,0,0,1,.571-.266.8.8,0,0,1,.563.272c.209.193.406.4.618.612l.324.331.934.929a.727.727,0,0,1,0,1.167l-.29.293c-.29.293-.562.571-.862.837l-.016.016a.61.61,0,0,0-.159.693c0,.01.006.016.01.025a7.348,7.348,0,0,0,1.1,1.784,12.486,12.486,0,0,0,3.014,2.742,4.439,4.439,0,0,0,.412.224,3.858,3.858,0,0,1,.343.187l.034.019a.655.655,0,0,0,.3.079.662.662,0,0,0,.466-.212l1.164-1.167a.826.826,0,0,1,.571-.278.784.784,0,0,1,.555.277l1.882,1.88a.752.752,0,0,1-.01,1.177c-.131.14-.269.274-.415.416a8.985,8.985,0,0,0-.653.677,1.714,1.714,0,0,1-1.34.569,1.293,1.293,0,0,1-.159-.006,7.519,7.519,0,0,1-2.692-.806,15.187,15.187,0,0,1-5.061-3.965,13.914,13.914,0,0,1-2.467-4.106,5.034,5.034,0,0,1-.4-2.179Z"
                                        transform="translate(-1029.295 -7)" fill="#4a4a4a"></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="ms-2 text-size">+91-9314444747 |</span>
                            <svg className="ms-2" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{verticalAlign : 'sub'}}>
                                <mask id="mask0_21010_33550" style={{maskType : 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="6" width="23"
                                    height="17">
                                    <path
                                    d="M4.82115 8.65114L3.91139 8.11787L3.41 6.92597C2.91858 6.91551 1.90436 6.90087 1.77889 6.92597C1.62205 6.95733 0.681026 8.87075 0.586923 9.05896C0.492821 9.24716 0.367188 12.5408 0.367188 12.7917V17.4968C0.367188 17.8419 1.43351 21.5746 1.59035 21.8255C1.74718 22.0765 4.82115 22.7038 5.07214 22.7038C5.32313 22.7038 10.8751 22.9861 11.4084 22.9861C11.9416 22.9861 19.1248 23.0175 20.1599 22.9861C20.988 22.9611 22.2825 20.5918 22.8262 19.4102C22.8053 18.4379 22.7446 16.399 22.6693 16.0226C22.5752 15.552 21.9479 11.3488 21.9479 11.1292C21.9479 10.9096 19.6894 8.40027 19.4698 8.40027C19.2942 8.40027 17.9119 7.98204 17.2427 7.77292H14.4197L13.0081 8.40027L12.6004 9.40404L11.7221 11.5998L9.58907 13.67H8.58531L5.95043 10.6901L5.38582 9.40404L4.82115 8.65114Z"
                                    fill="#D9D9D9">
                                    </path>
                                </mask>
                                <g mask="url(#mask0_21010_33550)">
                                    <path
                                    d="M3.76514 19.1676H1.97698C1.78728 19.1676 1.60535 19.1001 1.47121 18.9801C1.33708 18.8602 1.26172 18.6974 1.26172 18.5277V9.57001C1.26172 9.40031 1.33708 9.23757 1.47121 9.11758C1.60535 8.99758 1.78728 8.93018 1.97698 8.93018H15.567V17.5052"
                                    stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path
                                    d="M20.6861 13.4091H15.5674V10.21H18.9732C19.101 10.21 19.226 10.2483 19.3319 10.32C19.4378 10.3917 19.5197 10.4934 19.5673 10.6122L20.6861 13.4091Z"
                                    stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path d="M1.78418 15.3286L15.567 15.3286" stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path
                                    d="M16.5268 21.0871C17.587 21.0871 18.4464 20.2276 18.4464 19.1676C18.4464 18.1074 17.587 17.248 16.5268 17.248C15.4668 17.248 14.6074 18.1074 14.6074 19.1676C14.6074 20.2276 15.4668 21.0871 16.5268 21.0871Z"
                                    stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path d="M14.6073 19.1675L8.00195 19.1675" stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path
                                    d="M15.5674 17.5054V13.4092H20.6861V18.5279C20.6861 18.6976 20.6187 18.8603 20.4986 18.9803C20.3787 19.1003 20.2159 19.1677 20.0462 19.1677H18.4467"
                                    stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path
                                    d="M5.95567 21.0871C7.01579 21.0871 7.87517 20.2276 7.87517 19.1676C7.87517 18.1074 7.01579 17.248 5.95567 17.248C4.89552 17.248 4.03613 18.1074 4.03613 19.1676C4.03613 20.2276 4.89552 21.0871 5.95567 21.0871Z"
                                    stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                </g>
                                <path
                                    d="M12.9905 7.09654C12.9905 10.7127 8.89953 13.5252 8.89953 13.5252C8.89953 13.5252 4.80859 10.7127 4.80859 7.09654C4.80859 6.03092 5.2396 5.00895 6.0068 4.25544C6.774 3.50193 7.81455 3.07861 8.89953 3.07861C9.98451 3.07861 11.0251 3.50193 11.7923 4.25544C12.5595 5.00895 12.9905 6.03092 12.9905 7.09654V7.09654Z"
                                    stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                                <path
                                    d="M8.98146 9.19729C10.0094 9.19729 10.8428 8.36394 10.8428 7.33595C10.8428 6.30796 10.0094 5.47461 8.98146 5.47461C7.95347 5.47461 7.12012 6.30796 7.12012 7.33595C7.12012 8.36394 7.95347 9.19729 8.98146 9.19729Z"
                                    stroke="#4A4A4A" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                            </svg>
                            <span className="ms-1 text-size">Track Order |</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ms-2" width="17" height="17" viewBox="0 0 18.916 18.916">
                                <path d="M236.244,363.456a.788.788,0,1,1-.788-.788A.788.788,0,0,1,236.244,363.456Zm0,0"
                                    transform="translate(-225.998 -349.269)" fill="#646464"></path>
                                <path
                                    d="M9.458,18.916a9.458,9.458,0,1,1,9.458-9.458A9.468,9.468,0,0,1,9.458,18.916Zm0-17.733a8.276,8.276,0,1,0,8.276,8.276A8.285,8.285,0,0,0,9.458,1.182Zm0,0"
                                    fill="#646464">
                                </path>
                                <path
                                    d="M168.682,93.8a.591.591,0,0,1-.591-.591v-.8a1.777,1.777,0,0,1,1.184-1.672,2.445,2.445,0,0,0,1.575-2.063,2.167,2.167,0,1,0-4.335,0,.591.591,0,0,1-1.182,0,3.35,3.35,0,1,1,6.7,0,3.627,3.627,0,0,1-2.364,3.179.591.591,0,0,0-.395.558v.8A.591.591,0,0,1,168.682,93.8Zm0,0"
                                    transform="translate(-159.224 -82.179)" fill="#646464">
                                </path>
                            </svg>
                            <span className="ms-1 text-size">Help Center</span>
                        </div>
                    </div>
                </nav>
                <header>
                    <div className="container">
                        <div className="d-flex flex-row">
                            <div>
                                <NavLink to="/">
                                    <img src="../assets/images/logo.svg" width="230" height="v=15.35" alt="Logo" />
                                </NavLink>
                            </div>
                            <div>
                                <form className="w-50" role="search">
                                    <input className="search-input mt-3 position-relative" type="search" placeholder="Search Products, Colors & More .." aria-label="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="position-absolute searchIcon-svg" width="18.762" height="20"
                                    viewBox="0 0 18.762 20">
                                    <path
                                        d="M19.461,18.217l-4.625-4.951a8.191,8.191,0,0,0,1.841-5.191A7.972,7.972,0,0,0,8.83,0,7.972,7.972,0,0,0,.984,8.075,7.972,7.972,0,0,0,8.83,16.15a7.611,7.611,0,0,0,4.5-1.461l4.66,4.988a1,1,0,0,0,1.447.029A1.076,1.076,0,0,0,19.461,18.217ZM8.83,2.107a5.892,5.892,0,0,1,5.8,5.968,5.892,5.892,0,0,1-5.8,5.968,5.892,5.892,0,0,1-5.8-5.968A5.892,5.892,0,0,1,8.83,2.107Z"
                                        transform="translate(-0.984)" fill="#4a4a4a">
                                    </path>
                                    </svg>
                                </form>
                            </div>
                            <div>
                                <ul className="navbar-nav">
                                    <li className="nav-item ms-5 mt-2">
                                        <NavLink className="nav-link" to="/">
                                            <svg width="28" height="28" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.5 13.0864V19.5C4.5 19.6989 4.57902 19.8897 4.71967 20.0303C4.86032 20.171 5.05109 20.25 5.25 20.25H18.75C18.9489 20.25 19.1397 20.171 19.2803 20.0303C19.421 19.8897 19.5 19.6989 19.5 19.5V13.0865"
                                                stroke="#e57200" strokeLinecap="round" strokeLinejoin="round">
                                            </path>
                                            <path
                                                d="M5.06573 3.75H18.9343C19.0973 3.75 19.2558 3.80309 19.3859 3.90124C19.516 3.99939 19.6106 4.13725 19.6554 4.29396L21 9H3L4.34458 4.29396C4.38936 4.13725 4.48396 3.99939 4.61408 3.90124C4.7442 3.80309 4.90274 3.75 5.06573 3.75Z"
                                                stroke="#e57200" strokeLinecap="round" strokeLinejoin="round">
                                            </path>
                                            <path
                                                d="M9 9V10.5C9 11.2956 8.68393 12.0587 8.12132 12.6213C7.55871 13.1839 6.79565 13.5 6 13.5C5.20435 13.5 4.44129 13.1839 3.87868 12.6213C3.31607 12.0587 3 11.2956 3 10.5V9"
                                                stroke="#e57200" strokeLinecap="round" strokeLinejoin="round">
                                            </path>
                                            <path
                                                d="M15 9V10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5V9"
                                                stroke="#e57200" strokeLinecap="round" strokeLinejoin="round">
                                            </path>
                                            <path
                                                d="M21 9V10.5C21 11.2956 20.6839 12.0587 20.1213 12.6213C19.5587 13.1839 18.7956 13.5 18 13.5C17.2044 13.5 16.4413 13.1839 15.8787 12.6213C15.3161 12.0587 15 11.2956 15 10.5V9"
                                                stroke="#e57200" strokeLinecap="round" strokeLinejoin="round">
                                            </path>
                                            </svg>
                                        </NavLink>
                                    </li>
                                    <span className="stores"><NavLink to="/" className="alink">Stores</NavLink></span>
                                    <li className="nav-item profile-logo">
                                        <NavLink className="nav-link">
                                            <svg width="23.673" height="23.482" viewBox="0 0 23.673 23.482">
                                            <g transform="translate(37.837 11.741)">
                                                <path
                                                d="M23.673,11.818A11.836,11.836,0,1,0,3.831,20.556h0l.387.344H4.3l.646.473.215.129.689.43.172.086.818.43h.043a11.75,11.75,0,0,0,2.884.9h.086l.947.129h2.152l.947-.129h.086a11.75,11.75,0,0,0,2.841-.9h.086l.775-.387.172-.129.689-.43.215-.172.56-.43.129-.086.387-.344h0a11.793,11.793,0,0,0,3.831-8.651Zm-22.812,0a10.975,10.975,0,1,1,18.249,8.221l-.387-.215-3.658-1.808a.947.947,0,0,1-.516-.861V15.864l.258-.344a8.78,8.78,0,0,0,1.119-2.2,1.549,1.549,0,0,0,.9-1.42V10.355a1.549,1.549,0,0,0-.387-1.033V7.3a3.486,3.486,0,0,0-.818-2.539,4.927,4.927,0,0,0-3.788-1.334A4.95,4.95,0,0,0,8.006,4.8a3.486,3.486,0,0,0-.775,2.5V9.322a1.549,1.549,0,0,0-.387,1.033v1.506a1.549,1.549,0,0,0,.56,1.205,8.092,8.092,0,0,0,1.334,2.755v1.248a.947.947,0,0,1-.516.861l-3.4,1.851L4.477,20A10.932,10.932,0,0,1,.861,11.818Zm17.432,8.866-.473.3-.215.129-.6.344-.129.086a10.975,10.975,0,0,1-1.506.646h-.043l-.818.258h0l-.861.172H13.6l-.818.086H10.89l-.818-.086h-.043a10.933,10.933,0,0,1-1.679-.43H8.307l-.818-.3h0l-.732-.344H6.672l-.646-.43-.172-.129-.56-.387h0l3.4-1.851a1.808,1.808,0,0,0,.947-1.593V15.52l-.086-.129a7.188,7.188,0,0,1-1.291-2.669V12.55l-.129-.086a.732.732,0,0,1-.344-.6V10.355a.689.689,0,0,1,.258-.516l.129-.129V7.3h0a2.582,2.582,0,0,1,.6-1.894,4.1,4.1,0,0,1,3.185-1.076,3.851,3.851,0,0,1,3.142,1.076,2.625,2.625,0,0,1,.6,1.894V9.752l.129.129a.689.689,0,0,1,.258.516V11.9a.732.732,0,0,1-.6.646l-.215.086-.086.215A7.963,7.963,0,0,1,14.118,15l-.3.387-.086.129v1.593a1.808,1.808,0,0,0,.99,1.636l3.658,1.808h.086Z"
                                                transform="translate(-37.837 -11.741)" fill="#4a4a4a">
                                                </path>
                                            </g>
                                            </svg>
                                        </NavLink>
                                    </li>
                                    {user && <span className="myProfileLoggedin"><NavLink className="alink">Hi {user.firstName?.split(' ')[0]}</NavLink></span>}
                                    {!user && <span className="myProfile"><NavLink className="alink">Profile</NavLink></span>}
                                    <div className="profileMenu position-absolute text-center rounded-2" style={{zIndex:1}}>
                                        <div className="container">
                                            {!user && 
                                                <>
                                                    <button type="button" className="btn btn-dark mt-3 border border-0 rounded-0 btn-bgcolor">
                                                        <NavLink to="login" className="text-white link">
                                                            SIGN IN
                                                        </NavLink>
                                                    </button>
                                                    <p className="profileMenu-customer">
                                                        New Customer?
                                                        <NavLink to="signup" className="txt-color">Start Here</NavLink>
                                                    </p>
                                                    <hr />
                                                </>
                                            }
                                            <p className="text-start mt-2">
                                                {(user && user?.role === "Admin") && 
                                                    <NavLink to="admin" className="alink alinks">
                                                        My Profile
                                                    </NavLink>
                                                }
                                                {((user && user?.role === "User") || !user) &&
                                                    <NavLink to="profile/edit-profile" className="alink alinks">
                                                        My Profile
                                                    </NavLink>
                                                }
                                            </p>
                                            <p className="text-start txt-color"><NavLink to="/" className="alink alinks">My Orders</NavLink></p>
                                            <p className="text-start txt-color"><NavLink to="profile/wishlist" className="alink alinks">My Wishlist</NavLink></p>
                                            <p className="text-start txt-color"><NavLink to="/" className="alink alinks">Saved Address</NavLink></p>
                                            <p className="text-start txt-color"><NavLink to="/" className="alink alinks">Wallet</NavLink></p>
                                            <hr />
                                            <p className="text-start txt-color"><NavLink to="/" className="alink alinks">Track Order</NavLink></p>
                                            <p className="text-start txt-color"><NavLink to="/" className="alink alinks">Help Desk</NavLink></p>
                                            {user && <p className="text-start txt-color"><NavLink to="/" className="alink alinks" onClick={logout}>Log Out</NavLink></p>}
                                        </div>
                                    </div>
                                    <li className="nav-item wishlist-logo">
                                        <NavLink className="nav-link" to="/">
                                            <svg width="22" height="20.455" viewBox="0 0 22 20.455">
                                            <g transform="translate(0 -5.713)">
                                                <path
                                                d="M21.964,7.925c-.321-3.535-2.823-6.1-5.954-6.1a5.918,5.918,0,0,0-5.07,2.922A5.7,5.7,0,0,0,5.99,1.826C2.86,1.826.358,4.39.037,7.925a6.289,6.289,0,0,0,.187,2.318A9.942,9.942,0,0,0,3.27,15.326l7.665,6.955,7.8-6.955a9.943,9.943,0,0,0,3.046-5.083,6.3,6.3,0,0,0,.187-2.317Zm-1.011,2.124A9.092,9.092,0,0,1,18.164,14.7l-7.225,6.446L3.839,14.7a9.1,9.1,0,0,1-2.791-4.65A5.5,5.5,0,0,1,.872,8.06l.006-.043C1.153,4.92,3.3,2.672,5.99,2.672a4.96,4.96,0,0,1,4.557,3.18l.39.924.39-.924A5.112,5.112,0,0,1,16.01,2.673c2.687,0,4.837,2.248,5.118,5.385A5.489,5.489,0,0,1,20.953,10.049Z"
                                                transform="translate(0 3.887)" fill="#4a4a4a">
                                                </path>
                                            </g>
                                            </svg>
                                        </NavLink>
                                    </li>
                                    <span className="wishlist"><NavLink to="profile/wishlist" className="alink">Wishlist (0)</NavLink></span>
                                    <li className="nav-item cart-logo">
                                        <NavLink className="nav-link" to="/">
                                            <svg width="22" height="20.165" viewBox="0 0 22 20.165">
                                            <g transform="translate(0 -5.384)">
                                                <path
                                                d="M2114.905,71.934a.482.482,0,0,0-.367-.183h-17.408l-.458-2.383c0-.183-.274-.367-.458-.367h-2.754a.459.459,0,1,0,0,.917h2.383l2.2,11.183a3.23,3.23,0,0,0,3.121,2.567H2111.7a.459.459,0,0,0,0-.917h-10.45a2.112,2.112,0,0,1-1.833-1.01l13.383-1.833a.394.394,0,0,0,.366-.365L2115,72.208a.452.452,0,0,0-.092-.275Zm-2.567,7.149-13.388,1.742-1.646-8.25H2113.9Zm-11.55,5.5a2.27,2.27,0,1,0,1.627.665A2.291,2.291,0,0,0,2100.788,84.583Zm0,3.666a1.375,1.375,0,1,1,1.375-1.375A1.41,1.41,0,0,1,2100.788,88.249Zm9.171-3.666a2.291,2.291,0,1,0,2.291,2.291,2.269,2.269,0,0,0-2.291-2.291Zm0,3.666a1.375,1.375,0,1,1,1.375-1.375A1.409,1.409,0,0,1,2109.959,88.249Z"
                                                transform="translate(-2093 -63.616)" fill="#4a4a4a">
                                                </path>
                                            </g>
                                            </svg>
                                        </NavLink>
                                    </li>
                                    <span className="cart"><NavLink to="/" className="alink">Cart (0)</NavLink></span>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container mt-4 list">
                    <ul className="navbar-nav d-flex flex-row justify-content-around">
                    {ItemList.map(list => 
                        <li className="nav-item" key={list.furnitureItemId}>
                            <a className="link" href={`/products?itemName=${encodeURIComponent(list.furnitureItemName)}`}>{list.furnitureItemName}</a>
                        </li>
                    )}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}