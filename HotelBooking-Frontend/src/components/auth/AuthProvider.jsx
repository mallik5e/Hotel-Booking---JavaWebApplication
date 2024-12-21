import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the AuthContext with default values
export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // Handle login by decoding the JWT token and setting user details in localStorage
    const handleLogin = async (token) => {
            const decodedToken = jwtDecode(token)
            localStorage.setItem("userId",decodedToken.sub)
            localStorage.setItem("userRole",decodedToken.roles)
            localStorage.setItem("token",token)
            setUser(decodedToken)
        } 
    

    // Handle logout by clearing user details and token from localStorage
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

    // Provide the user, handleLogin, and handleLogout functions to the children components
    return (
        <AuthContext.Provider value={ {user, handleLogin, handleLogout} }>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthProvider;
