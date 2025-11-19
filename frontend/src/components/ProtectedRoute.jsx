import { Navigate } from "react-router-dom";


// this componenet ensure that before accessing a route ou need to have a valid token;
function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;