import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Check localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const isAuth = localStorage.getItem("isAuth");

    if (savedUser && isAuth === "true") {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, []);

  // 🔹 Login
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuth", "true");
    navigate("/");
  };

  // 🔹 Signup
  const signup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuth", "true");
    navigate("/");
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.setItem("isAuth", "false");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
