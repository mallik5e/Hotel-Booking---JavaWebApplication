import React, { createContext, useState, useContext } from 'react' 
import { jwt_decode } from 'jwt-decode' 

export const AuthContext  =  createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogOut: () => {}
}) 

const AuthProvider = ({children}) => {
  const[user, setUser] = useState(null) 

  const handleLogin = (token) => {
    const decodedToken = jwt_decode(token) 
    localStorage.setItem("userId", decodedToken.sub)
    localStorage.setItem("userRole", decodedToken.sub)
    localStorage.setItem("token", token) 
    setUser(decodedToken)
  } 

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
  }


return (
    <div>
       <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
    </div>
)

}

export const useAuth = () => {
	return useContext(AuthContext)
}