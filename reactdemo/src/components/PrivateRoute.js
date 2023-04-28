import React from "react";
import { isLoggedIn } from "../services/LoginService";
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({component : Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={props =>
               isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />  
                )
            }
        />
    );
}

export default PrivateRoute;