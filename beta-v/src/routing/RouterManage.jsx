import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "../components/Navbar";
import LoginPage from "../pages/Authentication/Login";
import SignupPage from "../pages/Authentication/Signup";
import KYCPage from "../pages/Details/KYC";
import Plans from "../pages/Details/Plans";
import Home from "../pages/Home/Home";

function RouterManage() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignupPage />} />
                <Route path="/kyc" element={<KYCPage />} />
                <Route path="/plans" element={<Plans />}/>
            </Routes>
        </Router>
    );
}

export default RouterManage;