import { createContext, useContext, useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(()=>{
        const storedUser=localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;

    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const login=(userData)=>{
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("isLoggedIn","true");
    };
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
    };

    return(
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );





};
export const useAuth=()=>useContext(AuthContext);