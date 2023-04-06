import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
import TopPick from "./TopPick";

export default function Home(){
    return(
        <div>
            <div className="d-flex flex-row mt-2 main-div">
                <div>
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner pointer">
                            <Link to="/products">
                                <div className="carousel-item active" data-bs-interval="2000">
                                    <img src="../../assets/images/banner.jpg" alt="first" />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="../../assets/images/banner-1.jpg" alt="second" />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="../../assets/images/banner-2.jpg" alt="third" />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="../../assets/images/banner-3.jpg" alt="fourth" />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="../../assets/images/banner-4.jpg" alt="fifth" />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="../../assets/images/banner-5.jpg" alt="sixth" />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="../../assets/images/banner-6.jpg" alt="seventh" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <button className="carousel-control-prev position-fixed carousel-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon text-dark bg-dark text-start"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next position-fixed carousel-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon text-dark bg-dark text-end"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="ms-2">
                    <img src="../../assets/images/new-launch.jpg" alt="" />
                    <img src="../../assets/images/Sofa-Cum-Beds-Gif.gif" className="mt-2" height="268px" width="100%" alt=""/>
                </div>
            </div>
            <div>
                <TopPick />
            </div>
        </div>
    );
}