import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been successfully created.",
        confirmButtonColor: "#0E562B",
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
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
        setIsLoggedIn(true);

        await Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Login successful.",
          confirmButtonColor: "#0E562B",
          timer: 1800,
          showConfirmButton: false,
        });

        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Login failed");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid email or password.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    const confirm = await Swal.fire({
      icon: "question",
      title: "Logout Confirmation",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonColor: "#0E562B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (confirm.isConfirmed) {
      setUser(null);
      setIsLoggedIn(false);

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        confirmButtonColor: "#0E562B",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/login");
    }
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
