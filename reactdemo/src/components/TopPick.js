import React, { useEffect, useState } from "react";
import './TopPick.css';
import { getFurnitureItems } from "../services/FurnitureItemsService";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

export default function TopPick() {

    useEffect(() => {
        getAllItems();
    },[]);

    const [topPicks, setTopPicks] = useState([]);
    async function getAllItems(){
        return await getFurnitureItems().then((response) => {
            const data = response.data;
            setTopPicks(data);
        }).catch((error) => {
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            });
            console.log(error);
        })
    }

    return (
        <div className="container">
            <div className="mb-4">
                <p className="headingNew">Top Picks For You</p>
                <p className="subheading">Impressive Collection For Your Dream Home</p>
            </div>
            <div className="">
                <div className="row gap-1">
                    {topPicks.map((topPick,i) => 
                        (topPick.imageUrl && 
                            <div key={i} className="col"> 
                                <NavLink to="products" className="text-decoration-none text-black">
                                    <img alt="" src={topPick.imageUrl} width={"190px"} height={"160px"} />
                                    <p className="text-center me-4">{topPick.furnitureItemName}</p>
                                </NavLink>
                            </div>
                        )
                    )}
                </div>
            </div>
            <ToastContainer />
            <hr />
        </div>
    );
}