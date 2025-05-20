import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
const ProtectedRoute=({allowedRole,children})=>{
    const {user,isLoggedIn}=useAuth();
    if(user==null){
        console.log("Please login before accessing",allowedRole,"routes");
        return <Navigate to="/login"/>
    }
    console.log(allowedRole);
    if(user.userType!=allowedRole){
        console.log("You are not allowed to enter into this");
        console.log("please login with",allowedRole);
        // return <Navigate to="/login" />;
        //unauthorized access component
        return;
    }
    return children;

        
}
export default ProtectedRoute;