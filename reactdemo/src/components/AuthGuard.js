import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthGuard(props){

    const { Component } = props;
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token)
        {
            if(token.role === 'Admin')
            {
                navigate('/admin');
            }
            else
            {
                navigate('/');
                toast.error("Unauthorized",{
                    position:"bottom-right"
                })
            }
        }
        else
        {
            navigate('/login');
            toast.error("Unauthenticated",{
                position:"bottom-right"
            })
            toast.error("Unauthorized",{
                position:"bottom-right"
            })
        }// eslint-disable-next-line
    }, []);

    return(
        <div>
            <Component />
        </div>
    );
}