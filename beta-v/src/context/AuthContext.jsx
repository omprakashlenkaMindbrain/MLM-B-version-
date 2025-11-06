import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();


  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedAuth = localStorage.getItem("isAuth");
    return savedAuth === "true"; // localStorage stores strings
  });

  // Sync state with localStorage whenever user or isLoggedIn changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuth", "true");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("rememberedUser");
      localStorage.setItem("isAuth", "false");
    }
  }, [user]);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    navigate("/"); // redirect to home
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login"); // redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
