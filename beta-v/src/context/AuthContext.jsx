import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUse } from "../hooks/user/getAuthUse";
import { useLogin } from "../hooks/user/useLogin";
import { useSignup } from "../hooks/user/useSignup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getaccesstoken, setGetaccesstoken] = useState(null);

  const navigate = useNavigate();
  const { signup: signupAPI } = useSignup();
  const { login: loginAPI } = useLogin();
  const { getLoggedinuser } = getAuthUse();

  // 🔹 Handle Signup
  const signup = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signupAPI(formData);
      if (!res) throw new Error("Signup failed");

      alert("✅ Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(`❌ ${err.message || "Signup failed"}`);
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Login
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAPI(credentials);

      if (res && res.accessToken) {
        const token = res.accessToken;
        setGetaccesstoken(token);
        const userData = await getLoggedinuser(token);
        setUser(userData);
        console.log(userData);
        setIsLoggedIn(true);
        alert("✅ Login successful!");
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      alert(`❌ ${err.message || "Login failed"}`);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    alert("👋 Logged out successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        getaccesstoken,
        loading,
        error,
        signup,
        login,
        logout,
        setUser,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
