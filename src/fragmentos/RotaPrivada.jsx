import { useAuth } from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";

function RotaPrivada ({children}) {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to='/login' replace={true}/>;
    }
    return children
}
export default RotaPrivada