import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { isLoggedin } = useAuth();

  const navLinksafterLoggedin = [
    { name: "Home", path: "/" },
    { name: "KYC", path: "/kyc" },
    { name: "Plans", path: "/plans" },
    { name: "Profile", path: "/profile" },
  ];


  const navLinkbeforeLoggedin = [
    { name: "Home", path: "/" },
    {name: "login", path:"/login"}
  ]

  const navLinks= isLoggedin ? navLinksafterLoggedin : navLinkbeforeLoggedin;




  const handleMobileLinkClick = () => {
    setIsOpen(false); // close mobile menu when link is clicked
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-green-900 shadow-lg"
      style={{ borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", overflow: "hidden" }}>
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="bg-green-700 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md hover:bg-green-600 transition"
          >
            BM
          </Link>
          <span className="text-white font-bold text-2xl tracking-wide">BM2 Mall</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.name}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={link.path}
                  className="text-white font-medium relative z-10 bg-clip-text hover:text-transparent bg-gradient-to-r from-green-300 via-green-100 to-green-300 transition-all duration-500"
                >
                  {link.name}
                </Link>
                {/* Animated underline / glow */}
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

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.4)" }}
            className="ml-4 bg-white text-green-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md"
          >
            Logout
          </motion.button>
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
            style={{ borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" }}
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
                  className="text-white hover:text-green-300 transition-colors"
                  onClick={handleMobileLinkClick}
                >
                  {link.name}
                </Link>
              ))}
              <button
                className="bg-white text-green-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md w-full text-center"
                onClick={handleMobileLinkClick}
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
