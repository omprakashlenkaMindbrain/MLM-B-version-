import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  FileText,
  LogIn,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const navLinksAfterLogin = [
    { name: "KYC", path: "/kyc", icon: <FileText size={18} /> },
    { name: "Plans", path: "/plans", icon: <CreditCard size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
  ];

  const navLinksBeforeLogin = []; // no nav items before login
  const navLinks = isLoggedIn ? navLinksAfterLogin : navLinksBeforeLogin;

  const handleMobileLinkClick = () => setIsOpen(false);

  return (
    <nav
      className="w-full bg-green-900 shadow-lg"
      style={{
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-2 flex justify-between items-center relative">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-[#2E7D32] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md hover:bg-[#81B633] transition">
            BM
          </div>
          <span className="text-white font-bold text-2xl tracking-wide">
            BM2 Mall
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.name}
                className="relative cursor-pointer flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {link.icon && React.cloneElement(link.icon, { color: "white" })}
                <Link
                  to={link.path}
                  className="text-white font-medium relative z-10 bg-clip-text hover:text-transparent bg-gradient-to-r from-green-300 via-green-100 to-green-300 transition-all duration-500"
                >
                  {link.name}
                </Link>
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-1 bg-gradient-to-r from-green-400 via-green-200 to-green-400 rounded-full"
                  style={{ width: isActive ? "100%" : 0 }}
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? "100%" : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>
            );
          })}

          {/* Logout / Login Buttons */}
          {isLoggedIn ? (
            <motion.button
              onClick={logout}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,255,255,0.4)",
              }}
              className="ml-4 bg-[#4CAF50] hover:bg-[#81B633] text-white px-3 py-1.5 rounded-lg font-medium shadow-md flex items-center gap-1.5 text-sm transition"
            >
              <LogOut size={16} color="white" />
              Logout
            </motion.button>
          ) : (
            <Link
              to="/login"
              className="ml-4 bg-[#4CAF50] hover:bg-[#81B633] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md flex items-center gap-2 transition"
            >
              <LogIn size={18} color="white" />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-green-800 overflow-hidden"
            style={{
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex flex-col gap-4 px-6 py-4 font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white hover:text-[#81B633] flex items-center gap-2 transition-colors"
                  onClick={handleMobileLinkClick}
                >
                  {link.icon &&
                    React.cloneElement(link.icon, { color: "white" })}
                  {link.name}
                </Link>
              ))}

              {/* Mobile Logout/Login */}
              {isLoggedIn ? (
                <button
                  className="bg-[#4CAF50] hover:bg-[#81B633] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md w-full text-center flex items-center justify-center gap-2"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut size={18} color="white" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#4CAF50] hover:bg-[#81B633] text-white px-5 py-2.5 rounded-xl font-semibold shadow-md w-full text-center flex items-center justify-center gap-2"
                  onClick={handleMobileLinkClick}
                >
                  <LogIn size={18} color="white" />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
