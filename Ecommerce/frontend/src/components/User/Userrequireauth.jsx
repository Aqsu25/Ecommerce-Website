import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuth";

export const Userrequireauth = ({ children }) => {
    const { user } = useContext(UserAuthContext);
    if (!user) {
        return <Navigate to='/login' />
    }
    return children;
}
