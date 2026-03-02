import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

export const Adminrequireauth=({children})=>{
    const {user}=useContext(AdminAuthContext);
    if(!user){
        return <Navigate to='/login'/>
    }
    return children;
}
