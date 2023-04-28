import { useState } from "react";

export const useFetchUser = () => {
    const [userToken, setUserToken] = useState({});
    //var userToken
    if(localStorage.getItem('token'))
    {
        const token = JSON.parse(localStorage.getItem('token'));
        setUserToken(token);
        return userToken;
    }
}
