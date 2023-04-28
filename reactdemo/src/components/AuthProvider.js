import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const currentUser = getUser();
        setUser(currentUser);
    }, []);
    
    function getUser(){
        if(localStorage.getItem('token'))
        {
            const userData = JSON.parse(localStorage.getItem('token'));
            return userData;
        }
    }

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};