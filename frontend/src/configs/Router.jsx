import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "../screens/Login/Login";
import { useSelector } from "react-redux";
import Dashboard from "../screens/Dashboard/Dashboard";

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = useSelector(state => state.session.isLoggedIn);
    return isAuthenticated ? element : <Navigate replace to="/" />;   
};  

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;