import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children})=>{
    const success = localStorage.getItem('login');
    return success ? children : <Navigate to='/login' />;
}