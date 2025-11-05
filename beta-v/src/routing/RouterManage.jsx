import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginPage from "../pages/Authentication/Login";
import SignupPage from "../pages/Authentication/Signup";

function RouterManage() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignupPage />} />
            </Routes>
        </Router>
    );
}

export default RouterManage;