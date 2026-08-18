import { useAuth } from '../Contexts/AuthContext';
import { Navigate } from "react-router-dom";

function RotaPrivada ({children}) {
    const { logado } = useAuth();
    if (!logado) {
        return <Navigate to='/login' replace={true}/>;
    }
    return children
}
export default RotaPrivada