import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    
    const login = ( userData, userToken ) =>{
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }} >
            { children }
        </AuthContext.Provider>
    )
}